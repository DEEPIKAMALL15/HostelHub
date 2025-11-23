import Verification from "../models/Verification.js";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from 'cloudinary';

// Get verification status for a hotel
export const getVerification = async (req, res) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const hotel = await Hotel.findOne({ owner: userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }

        let verification = await Verification.findOne({ hotel: hotel._id });
        if (!verification) {
            verification = await Verification.create({ hotel: hotel._id });
        }

        // Include hotel ID for sharing
        const verificationWithHotel = verification.toObject();
        verificationWithHotel.hotelId = hotel._id.toString();
        res.json({ success: true, verification: verificationWithHotel });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Upload Aadhar and PAN cards
export const uploadDocuments = async (req, res) => {
    try {
        const { userId } = await req.auth();
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const hotel = await Hotel.findOne({ owner: userId });
        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }

        let verification = await Verification.findOne({ hotel: hotel._id });
        if (!verification) {
            verification = await Verification.create({ hotel: hotel._id });
        }

        const updateData = {};

        // Upload Aadhar card if provided
        if (req.files && req.files['aadharCard'] && req.files['aadharCard'][0]) {
            const aadharResponse = await cloudinary.uploader.upload(req.files['aadharCard'][0].path);
            updateData.aadharCard = aadharResponse.secure_url;
        }

        // Upload PAN card if provided
        if (req.files && req.files['panCard'] && req.files['panCard'][0]) {
            const panResponse = await cloudinary.uploader.upload(req.files['panCard'][0].path);
            updateData.panCard = panResponse.secure_url;
        }

        // Reset verification status to pending when documents are updated
        if (Object.keys(updateData).length > 0) {
            updateData.verificationStatus = "pending";
            await Verification.findByIdAndUpdate(verification._id, updateData);
        }

        const updatedVerification = await Verification.findById(verification._id);
        res.json({ success: true, message: "Documents uploaded successfully", verification: updatedVerification });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Add local feedback
export const addLocalFeedback = async (req, res) => {
    try {
        const { hotelId, name, email, phone, address, feedback } = req.body;

        if (!hotelId || !name || !email || !phone || !address || !feedback) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        let verification = await Verification.findOne({ hotel: hotelId });
        if (!verification) {
            verification = await Verification.create({ hotel: hotelId });
        }

        verification.localFeedback.push({
            name,
            email,
            phone,
            address,
            feedback
        });

        await verification.save();
        res.json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get verification for a specific hotel (public endpoint for local people)
export const getHotelVerification = async (req, res) => {
    try {
        const { hotelId } = req.params;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.json({ success: false, message: "Hotel not found" });
        }

        const verification = await Verification.findOne({ hotel: hotelId });
        if (!verification) {
            return res.json({ success: true, verification: null });
        }

        // Return verification with feedback (but not sensitive document URLs for public)
        const publicVerification = {
            _id: verification._id,
            verificationStatus: verification.verificationStatus,
            localFeedback: verification.localFeedback,
            verifiedAt: verification.verifiedAt,
            createdAt: verification.createdAt
        };

        res.json({ success: true, verification: publicVerification, hotel: { name: hotel.name, address: hotel.address, city: hotel.city } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

