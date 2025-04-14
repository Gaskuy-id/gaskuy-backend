const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

// kalau ada orang yang mau akses API kita tapi gapunya token, maka kita kasih UNAUTHORIZED
class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;
