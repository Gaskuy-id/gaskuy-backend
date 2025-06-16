const { StatusCodes } = require('http-status-codes');
const { signupService, signinService } = require("../../../services/mongoose/auth");

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

        const { token, role } = await signinService({
            email,
            password
        })

        res.status(StatusCodes.OK).json({ 
            message: "Login berhasil", 
            data: {
                token: token,
                role: role
            }
        });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    signupController,
    signinController,
}
