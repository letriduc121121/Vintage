const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Load environment variables from .env
dotenv.config();

const router = express.Router();

// Cloudinary configuration from environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // Allow up to 10MB files

// Test route
router.get('/', (req, res) => {
    res.send('This is the upload page');
});

// File upload route
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File uploaded:', req.file);

        // Stream upload function to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('Cloudinary upload result:', result);
                        resolve(result);
                    }
                });
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Upload the file and get the result
        const result = await streamUpload(req.file.buffer);

        // Return the secure URL from Cloudinary
        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Server Error uploading image' });
    }
});

module.exports = router;
