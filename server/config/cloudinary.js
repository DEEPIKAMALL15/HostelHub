import {v2 as cloudinary} from 'cloudinary';

const connectCloudinary = async () => {
    // Prefer CLOUDINARY_URL if provided, otherwise use individual variables
    const cloudinaryUrl = process.env.CLOUDINARY_URL;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudinaryUrl) {
        // Parse CLOUDINARY_URL and configure explicitly
        const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
        if (!match) {
            throw new Error('Invalid CLOUDINARY_URL format');
        }
        const [, parsedApiKey, parsedApiSecret, parsedCloudName] = match;
        cloudinary.config({
            cloud_name: parsedCloudName,
            api_key: parsedApiKey,
            api_secret: parsedApiSecret,
            secure: true,
        });
        return;
    }

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error('Cloudinary config missing: set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
    })
}

export default connectCloudinary;