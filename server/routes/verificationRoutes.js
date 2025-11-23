import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getVerification, uploadDocuments, addLocalFeedback, getHotelVerification } from '../controllers/verificationController.js';
import upload from '../middleware/uploadMiddleware.js';

const verificationRouter = express.Router();

// Get verification status (hotel owner only)
verificationRouter.get('/', protect, getVerification);

// Upload documents (hotel owner only)
verificationRouter.post('/upload', protect, upload.fields([
    { name: 'aadharCard', maxCount: 1 },
    { name: 'panCard', maxCount: 1 }
]), uploadDocuments);

// Add local feedback (public)
verificationRouter.post('/feedback', addLocalFeedback);

// Get hotel verification (public)
verificationRouter.get('/hotel/:hotelId', getHotelVerification);

export default verificationRouter;

