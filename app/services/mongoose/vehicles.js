const Vehicle = require("../../api/v1/vehicle/model");
const Branch = require("../../api/v1/branch/model")
const { BadRequestError, NotFoundError } = require('../../errors');
const NotFound = require("../../errors/not-found");

const createVehicleService = async (data) => {
  const { branchId } = data;
  
  const branch = await Branch.findById(branchId);

  if(!branch){
    throw new NotFoundError("Branch tidak valid");
  }

  const newVehicle = await Vehicle.create(data);
  
  return newVehicle;
}

const getAllVehicleService = async (branchId) => {
  const vehicles = await Vehicle.find({ branchId: branchId })
    .populate({
      path: 'branchId',
      select: '_id name city address'
    });

  return vehicles;
}

const getAllVehicleByCityService = async (city) => {
  const branch = await Branch.findOne({city: city});
  const vehicles = await Vehicle.find({branchId: branch._id})
    .populate({
      path: 'branchId',
      select: '_id name city address'
    });

  return vehicles;
}

const getOneVehicleService = async (req) => {
  const { id } = req.params;

  const result = await Vehicle.findOne({ _id: id })
  .populate({
    path: 'branchId',
    select: '_id name city address',
  })

  if (!result) throw new NotFoundError(`Tidak ada kendaraan dengan id: ${id}`);
  
  return result;
}

const updateVehicleService = async (req) => {
  const { id } = req.params;
  const { name, transmission, year, kilometer, engineCapacity, seat, luggage, branchId, ratePerHour, currentStatus, mainImage, detailImage} = req.body;

  const result = await Vehicle.findOneAndUpdate(
    { _id: id },
    { name, transmission, year, kilometer, engineCapacity, seat, luggage, branchId, ratePerHour, currentStatus, image},
    { new: true, runValidators: true}
  );

  if (!result) throw new NotFoundError(`Tidak ada kendaraan dengan id ${id}`);

  return result;
}

const deleteVehicleService = async (req) => {
  const { id } = req.params;

  const result = await Vehicle.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada kendaraan dengan id ${id}`);

  await result.deleteOne();

  return result;
}

module.exports = {
  createVehicleService,
  getAllVehicleService,
  getAllVehicleByCityService,
  getOneVehicleService,
  updateVehicleService,
  deleteVehicleService
}
