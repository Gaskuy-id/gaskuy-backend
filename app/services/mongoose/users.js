const User = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createUser = async (data) => {
  const result = await User.create(data)

  return result;
}

const findUserByEmail = async (email) => {
  const result = await User.findOne({ email });

  return result;
}

const findUserById = async (id) => {
  const result = await User.findById(id);

  if (!result) {
    throw new NotFoundError("User tidak ditemukan")
  }

  return result;
}

const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  
  if (!updatedUser) {
    throw new NotFoundError("User tidak ditemukan");
  }

  return updatedUser;
}

const deleteUser = async (id) => {
  const deletedUser = User.findByIdAndDelete(id);

  return deletedUser;
}

module.exports = {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser
}
