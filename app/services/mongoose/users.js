// users.js - Service Layer
const User = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createDriverService = async (req) => {
  const { fullName, email, password, phoneNumber, address, currentStatus, branch, role } = req.body;

  // Cek apakah email sudah terdaftar
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new BadRequestError(`User dengan email: ${email} sudah terdaftar`);
  }

  // Buat objek driverInfo dari input
  const driverInfo = {
    currentStatus: currentStatus,
    branch: branch
  };

  // Buat user baru dengan role driver
  const newUser = await User.create({
    fullName,
    email,
    password,
    phoneNumber,
    address,
    role: role || "driver", // default ke driver jika tidak ada
    driverInfo
  });
  
  return newUser;
}

const getAllUserService = async (req) => {
  const { role } = req.params;

  const users = await User.find({ role: role, deletedAt: null })
    .populate('driverInfo.branch'); // populate branch info untuk driver

  return users;
}

const getOneUserService = async (req) => {
  const { id } = req.params;

  const result = await User.findOne({ _id: id, deletedAt: null })
    .populate('driverInfo.branch');

  if (!result) throw new NotFoundError(`Tidak ada user dengan id: ${id}`);

  return result;
}

const updateDriverService = async (req) => {
  const { id } = req.params;
  const { fullName, email, password, phoneNumber, address, role, currentStatus, branch, image } = req.body;

  // Siapkan data update
  const updateData = {
    fullName,
    email,
    phoneNumber,
    address,
    role
  };

  // Update driverInfo jika ada perubahan
  if (currentStatus || branch) {
    updateData.$set = updateData.$set || {};
    updateData.$set['driverInfo'] = updateData.$set['driverInfo'] || {};
    
    if (currentStatus) updateData.$set['driverInfo.currentStatus'] = currentStatus;
    if (branch) updateData.$set['driverInfo.branch'] = branch;
  }

  // Tambahkan image jika ada
  if (image) updateData.image = image;

  const result = await User.findOneAndUpdate(
    { _id: id, deletedAt: null },
    updateData,
    { new: true, runValidators: true }
  ).populate('driverInfo.branch');

  if (!result) throw new NotFoundError(`Tidak ada user dengan id ${id}`);

  return result;
}

const deleteUserService = async (req) => {
  const { id } = req.params;

  const result = await User.findOne({
      _id: id,
      deletedAt: null
  });

  if (!result) throw new NotFoundError(`Tidak ada user dengan id ${id}`);

  result.deletedAt = new Date();
  await result.save();

  return result;
}

module.exports = {
  createDriverService,
  getAllUserService,
  getOneUserService,
  updateDriverService,
  deleteUserService
}