const User = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createDriverService = async (req) => {
  const { email, driverInfo} = req.body;

  const user = await User.findOne({ email: email });

  if (!user) throw new NotFoundError(`User dengan email: ${email} tidak ditemukan `);

  user.role = "driver";
  user.driverInfo = driverInfo;
  await user.save();
  
  return user;
}

const getAllUserService = async (req) => {
  const { role } = req.params;

  const users = await User.find({ role: role })

  return users;
}

const getOneUserService = async (req) => {
  const { id } = req.params;

  const result = await User.findOne({ _id: id})

  if (!result) throw new NotFoundError(`Tidak ada user dengan id: ${id}`);

  return result;
}

const updateDriverService = async (req) => {
  const { id } = req.params;
  const { fullName, email, password, phoneNumber, address, role, driverInfo, mainImage, detailImage } = req.body;

  const result = await User.findOneAndUpdate(
    { _id: id },
    { fullName, email, password, phoneNumber, address, role, driverInfo, mainImage, detailImage },
    { new: true, runValidators: true}
  );

  if (!result) throw new NotFoundError(`Tidak ada user dengan id ${id}`);

  return result;
}

const deleteUserService = async (req) => {
  const { id } = req.params;

  const result = await User.findOne({
      _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id ${id}`);

  await result.deleteOne();

  return result;
}

module.exports = {
  createDriverService,
  getAllUserService,
  getOneUserService,
  updateDriverService,
  deleteUserService
}
