// import http-status-code
const { StatusCodes } = require('http-status-codes');
// import custom-api-error
const CustomAPIError = require('./custom-api-error');

// Buat class badrequest dg extends dri class cutomAPIError agar bisa pakai semua func di class CustAPIErr
class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message);
        // Memberikan statusCode bad request--400 (yg ga sesuai)
        this.StatusCode = StatusCodes.BAD_REQUEST; // akan kita parsing di middleware/error handling
    }
}

module.exports = BadRequest;
