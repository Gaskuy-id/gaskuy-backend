const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {BadRequestError, NotFoundError} = require('../errors');
const { createUser, findUserByEmail, findUserById, updateUser, deleteUser } = require("./mongoose/users");

const userRegister = async ({fullName, email, password, phoneNumber, address, image, role}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = createUser({
    fullName, 
    email,
    password: hashedPassword, 
    phoneNumber, 
    address, 
    image, 
    role
  })

  return newUser;
}

const userLogin = async ({email, password}) => {
  user = findUserByEmail(email)

  if(!user){
    throw new NotFoundError("Email tidak ditemukan")
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Password salah")
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;   
}

module.exports = {
  userRegister,
  userLogin
}
