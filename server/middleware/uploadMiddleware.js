import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 1.5 * 1024 * 1024, // ~1.5MB per file to avoid upstream 413 on hosting
        files: 4,
    },
});

export default upload;