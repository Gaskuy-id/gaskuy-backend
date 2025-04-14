// Semua custom error yang ada di folder errors, akan ditangkap disini
// ini akan di import di app.js
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // Set ke default
        StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR, // kalau err.statusCode gadapet, kita kasih tau internal server error (krn ga ketahuan)
        msg: err.message || 'Something went wrong, try again later',
    };

    // Error validation dari mongoose. ini untuk handling validation error
    // ketika seperti name required, maxlength, dll, akan masuk keisni, errornya biasanya bentuknya objek dan bisa banyak
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors) //Object.values untuk ngelooping objek error nya (krn bisa aja banyak)
        .map((item) => item.message)
        .join(', '); // di join dijadiin satu krn message nya banyak
        customError.StatusCode = 400;
    }

    // untuk handle duplicate value
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(
            err.keyValue //object.keys(err.keyValue) untuk ngasih tau yang sama itu apa dimana
        )} field, please choose another value`;
        customError.StatusCode = 400;
    }

    // untuk handle crash, biasanya itu karena kita gabuat suatu variabel, tapi kita panggil
    // misalnya kita gabuat variabel organizer diawal, tapi di const result tau-tau dipanggil
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.StatusCode = 404;
    }

    return res.status(customError.StatusCode).json({
        msg: customError.msg,
    });
};

module.exports = errorHandlerMiddleware;
