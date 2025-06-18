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

const getAllDriverByBranchService = async (req) => {
  const { branch } = req.params;

  const drivers = await User.find({
    'driverInfo.branch': branch,
    role: 'driver',
    deletedAt: null
  }).populate({
    path: 'driverInfo.branch',
    select: '_id name city address'
  });

  if (drivers.length === 0) {
    throw new NotFoundError(`Tidak ada driver ditemukan untuk branch dengan id: ${branch}`);
  }

  return drivers;
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
  const { fullName, email, password, phoneNumber, address, role, currentStatus, branch, mainImage, detailImage } = req.body;

  // Siapkan data update
  const updateData = {
    fullName,
    email,
    password,
    currentStatus: currentStatus,
    phoneNumber,
    address,
    role
  };

  // Jika ada data driver info, update juga
  if (currentStatus || branch) {
    updateData.driverInfo = {};
    if (currentStatus) updateData.driverInfo.currentStatus = currentStatus;
    if (branch) updateData.driverInfo.branch = branch;
  }

  // Tambahkan image jika ada
  if (mainImage) updateData.mainImage = mainImage;
  if (detailImage) updateData.detailImage = detailImage;

  const result = await User.findOneAndUpdate(
    { _id: id, deletedAt: null },
    updateData,
    { new: true, runValidators: true}
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
  deleteUserService,
  getAllDriverByBranchService
}