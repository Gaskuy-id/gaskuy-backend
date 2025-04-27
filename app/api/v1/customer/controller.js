const { StatusCodes } = require('http-status-codes');
const { signupService, signinService } = require("../../../services/authService");
const { checkoutService, editProfileService, getProfileService } = require("../../../services/mongoose/customers");

const signupController = async (req, res, next) => {
    try {
        const data = req.body;

        const newUser = await signupService(data)

        res.status(StatusCodes.CREATED).json({
        message: "User berhasil terdaftar",
        data: newUser
        });
    } catch (error) {
        next(error)
    }
}

const signinController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const token = await signinService({
        email,
        password
        })

        res.status(StatusCodes.OK).json({ message: "Login berhasil", token });
    } catch (error) {
        next(error)
    }
};

const editProfileController = async (req, res, next) => {
    try {
        const _id = req.user.id;
        
        const data = req.body;

        const updatedUser = await editProfileService(_id, {
        ...data,
        image: req.file ? `/uploads/${req.file.filename}` : null
        })
    
        res.status(StatusCodes.OK).json({ message: "Profile berhasil diupdate", user: updatedUser})
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

        res.status(StatusCodes.OK).json(userObj);
    } catch (error) {
        next(error)
    }
};

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

        res.status(StatusCodes.OK).json({message: "Order berhasil", rental: result})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signupController,
    signinController,
    getProfileController,
    editProfileController,
    checkoutController
}
