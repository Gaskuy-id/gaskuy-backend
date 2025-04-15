
const { StatusCodes } = require('http-status-codes');
const { registerUser, loginUser } = require("../../../services/authService");
const { updateUser, findUserById } = require("../../../services/mongoose/users")

exports.register = async (req, res, next) => {
  try {
    const data = req.body;

    const newUser = await registerUser(data)

    res.status(StatusCodes.CREATED).json({
      message: "User berhasil terdaftar",
      data: newUser
    });
  } catch (error) {
    next(error)
  }
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await loginUser({
      email,
      password
    })

    res.status(StatusCodes.OK).json({ message: "Login berhasil", token });
  } catch (error) {
    next(error)
  }
};

exports.editProfile = async (req, res, next) => {
  try {
    const _id = req.user.id;
    console.log(req.user)
    const data = req.body;

    const updatedUser = await updateUser(_id, {
      ...data,
      image: req.file ? `/uploads/${req.file.filename}` : null
    })

    res.status(StatusCodes.OK).json({ message: "Profile berhasil diupdate", user: updatedUser})
  } catch (error) {
    next(error)
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const _id = req.user.id

    const user = await findUserById(_id);

    const userObj = user.toObject();
    delete userObj.password;

    res.json(userObj);
  } catch (error) {
    next(error)
  }
};
