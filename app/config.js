const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
    dbUri: process.env.DB_URI,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtSecret: process.env.JWT_SECRET,
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET
    }
}