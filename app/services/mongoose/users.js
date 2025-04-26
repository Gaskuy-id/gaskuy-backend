const User = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createUserService = async (data) => {
  const result = await User.create(data)

  return result;
}

const findUserByEmailService = async (email) => {
  const result = await User.findOne({ email });

  return result;
}

const findUserByIdService = async (id) => {
  const result = await User.findById(id);

  if (!result) {
    throw new NotFoundError("User tidak ditemukan")
  }

  return result;
}

const updateUserService = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  
  if (!updatedUser) {
    throw new NotFoundError("User tidak ditemukan");
  }

  return updatedUser;
}

const deleteUserService = async (id) => {
  const deletedUser = User.findByIdAndDelete(id);

  return deletedUser;
}

module.exports = {
  createUserService,
  findUserByIdService,
  findUserByEmailService,
  updateUserService,
  deleteUserService
}
