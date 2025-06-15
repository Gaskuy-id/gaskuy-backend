const path = require('path');
const multer = require('multer');
const { uploadToCloudinary } = require(path.join(__dirname, '..', 'utils', 'cloudinary'));
const { BadRequestError } = require('../errors');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    console.log(`Processing file: ${file.originalname}, type: ${file.mimetype}`);
    
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new BadRequestError('Hanya file gambar yang diperbolehkan'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

const uploadMiddleware = (fields) => {
    return (req, res, next) => {
        console.log('Starting file upload process...');
        
        upload.fields(fields)(req, res, async (err) => {
            if (err) {
                console.error('Multer error:', err);
                return next(err);
            }

            try {
                console.log('Received files:', req.files ? Object.keys(req.files) : 'No files');
                
                // Upload main image
                if (req.files?.['mainImage']) {
                    console.log('Processing main image...');
                    const mainImage = req.files['mainImage'][0];
                    
                    try {
                        const result = await uploadToCloudinary(mainImage.buffer, 'vehicles/main');
                        console.log('Main image uploaded:', result.secure_url);
                        req.body.mainImage = result.secure_url;
                    } catch (uploadError) {
                        console.error('Main image upload failed:', uploadError);
                        return next(new BadRequestError('Gagal mengupload gambar utama'));
                    }
                }

                // Upload detail images
                if (req.files?.['detailImages']) {
                    console.log(`Processing ${req.files['detailImages'].length} detail images...`);
                    
                    try {
                        const uploadPromises = req.files['detailImages'].map(async (file) => {
                            const result = await uploadToCloudinary(file.buffer, 'vehicles/details');
                            return result.secure_url;
                        });
                        
                        req.body.detailImages = await Promise.all(uploadPromises);
                        console.log('Detail images uploaded successfully');
                    } catch (uploadError) {
                        console.error('Detail images upload failed:', uploadError);
                        return next(new BadRequestError('Gagal mengupload gambar detail'));
                    }
                }

                next();
            } catch (error) {
                console.error('Upload middleware error:', error);
                next(error);
            }
        });
    };
};

module.exports = uploadMiddleware;