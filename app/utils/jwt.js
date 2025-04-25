const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiration, jwtRefreshExpiration } = require('../config');

const createJWT = ({ payload }) => {
    // jwt.sign digunakan untuk mendaftarkan token kita
    // jwtSecret sebagai secret key (random)
    // yang kita createJWT kita punya payload, yang dikirim dari auth.js createTokenUser(result) yang nyambung ke createTokenUser.js (isinya data data)
    const token = jwt.sign(payload, jwtSecret, { 
        // ini opsional
        expiresIn: jwtExpiration,
    });

    return token;
};

const createRefreshToken = ({ payload }) => {
    const refreshToken = jwt.sign(payload, jwtSecret, {
        expiresIn: jwtRefreshExpiration,
    });

    return refreshToken;
};

const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);

module.exports = {
    createJWT,
    isTokenValid,
    createRefreshToken,
};
