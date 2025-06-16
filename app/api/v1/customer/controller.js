const { StatusCodes } = require('http-status-codes');
const { signupService, signinService } = require("../../../services/mongoose/auth");
const { checkoutService, editProfileService, getProfileService, getAvailableVehiclesService } = require("../../../services/mongoose/customers");

const editProfileController = async (req, res, next) => {
    try {
        const _id = req.user.id;
        
        const data = req.body;

        const updatedUser = await editProfileService(_id, {
            ...data,
            image: req.file ? `/uploads/${req.file.filename}` : null
        })
    
        res.status(StatusCodes.OK).json({ 
            message: "Profile berhasil diupdate", 
            data: updatedUser})
    } catch (error) {
        next(error)
    }
};

const getProfileController = async (req, res, next) => {
    try {
        const _id = req.user.id

        const user = await getProfileService(_id);

        const userObj = user.toObject();
        delete userObj.password;

        res.status(StatusCodes.OK).json({
            data: userObj
        });
    } catch (error) {
        next(error)
    }
};

const getAvailableVehiclesController = async (req, res, next) => {
    try {
        const { city, currentStatus, passengerCount } = req.query;
        const result = await getAvailableVehiclesService(city, currentStatus, passengerCount);

        res.status(StatusCodes.OK).json({
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const checkoutController = async (req, res, next) => {
    try {
        const customerId = req.user.id;
        const vehicleId = req.params.id;
        const { withDriver, ordererName, ordererPhone, ordererEmail, startedAt, locationStart, finishedAt, locationEnd, note }
 = req.body;

        const result = await checkoutService({
            customerId, 
            vehicleId,
            withDriver,
            ordererName,
            ordererPhone,
            ordererEmail,
            startedAt,
            locationStart,
            finishedAt,
            locationEnd,
            note
        });


        res.status(StatusCodes.OK).json({
            message: "Order berhasil", 
            rental: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getProfileController,
    editProfileController,
    checkoutController,
    getAvailableVehiclesController
}
