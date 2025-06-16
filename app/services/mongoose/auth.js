const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BadRequestError, NotFoundError } = require('../../errors');
const User = require('../../api/v1/users/model');
const { createJWT, createTokenUser } = require("../../utils");

const signupService = async ({fullName, email, password, phoneNumber, address, image, role}) => {
  const user = await User.findOne({email})

  if(user){
    throw new NotFoundError("Email sudah digunakan")
  }

  const newUser = User.create({
    fullName, 
    email,
    password, 
    phoneNumber, 
    address, 
    image, 
    role
  })

  return newUser;
}

const signinService = async ({email, password}) => {
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({email: email})

  if(!user){
    throw new NotFoundError("Email tidak ditemukan")
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new BadRequestError("Password salah")
  }

  const token = createJWT({ payload: createTokenUser(user) })
  return {
    token: token,
    role: user.role
  };   
}

module.exports = {
  signupService,
  signinService
}
