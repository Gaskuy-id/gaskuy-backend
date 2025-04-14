const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbUri: process.env.DB_URI,
    // buat expired token loginnya selama 24 jam
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtSecret: process.env.JWT_SECRET,
}
