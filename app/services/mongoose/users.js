const User = require("../../api/v1/users/model")

const createUser = async (fullName, email, password, phoneNumber, address, image, role) => {
  const result = await User.create({
    fullName, 
    email, 
    password, 
    phoneNumber, 
    address, 
    image, 
    role
  })

  return result;
}

const findUserByEmail = async (email) => {
  const result = await User.findOne({ email });

  return result;
}

const findUserById = async (id) => {
  const result = await User.findById(id);

  return result;
}
const updateUser = async (id, data) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

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
