const { StatusCodes } = require('http-status-codes');
const { signupService, signinService } = require("../../../services/authService");
const { updateUserService, findUserByIdService } = require("../../../services/mongoose/users")

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
    console.log(req.user)
    const data = req.body;

    const updatedUser = await updateUserService(_id, {
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

    const user = await findUserByIdService(_id);

    const userObj = user.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    next(error)
  }
};

module.exports = {
    signupController,
    signinController,
    getProfileController,
    editProfileController
}
