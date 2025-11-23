import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true,
        unique: true
    },
    aadharCard: {
        type: String, // Cloudinary URL
        default: null
    },
    panCard: {
        type: String, // Cloudinary URL
        default: null
    },
    verificationStatus: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },
    localFeedback: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        feedback: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    verifiedBy: {
        type: String,
        ref: "User",
        default: null
    },
    verifiedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;

