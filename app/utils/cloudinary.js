// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const config = require('../config');

// Debug: Tampilkan konfigurasi yang digunakan
console.log('Cloudinary Config:', {
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key ? '***' + config.cloudinary.api_key.slice(-4) : 'undefined',
  upload_preset: config.cloudinary.upload_preset
});

// Validasi konfigurasi
if (!config.cloudinary.cloud_name || !config.cloudinary.api_key || !config.cloudinary.api_secret) {
  throw new Error('Konfigurasi Cloudinary tidak lengkap! Periksa .env file');
}

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true
});

const uploadToCloudinary = async (fileBuffer, folder) => {
  try {
    console.log(`Mengupload ke folder: ${folder}`);
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          upload_preset: config.cloudinary.upload_preset,
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) {
            console.error('Error upload Cloudinary:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      
      uploadStream.end(fileBuffer);
    });

    console.log('Upload berhasil:', result.secure_url);
    return result;
  } catch (error) {
    console.error('Error dalam uploadToCloudinary:', error);
    throw error;
  }
};

module.exports = {
  uploadToCloudinary
};