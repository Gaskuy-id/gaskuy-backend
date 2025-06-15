const Vehicle = require("../../api/v1/vehicle/model");
const Branch = require("../../api/v1/branch/model");
const { BadRequestError, NotFoundError } = require('../../errors');
const { deleteFromCloudinary } = require('../../utils/cloudinary');

const getPublicIdFromUrl = (url) => {
    const parts = url.split('/');
    const folderAndFile = parts.slice(parts.indexOf('vehicles')).join('/');
    return folderAndFile.split('.')[0];
};

const createVehicleService = async (data) => {
    const { branchId } = data;
    
    const branch = await Branch.findById(branchId);
    if(!branch) {
        throw new NotFoundError("Branch tidak valid");
    }

    const newVehicle = await Vehicle.create(data);
    return newVehicle;
};

const getAllVehicleService = async (branchId) => {
    const vehicles = await Vehicle.find({
        branchId: branchId,
        deletedAt: null
    }).populate({
        path: 'branchId',
        select: '_id name city address'
    });

    return vehicles;
};

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
    const data = req.body;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) throw new NotFoundError(`Tidak ada kendaraan dengan id ${id}`);

    // Update vehicle data
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    return updatedVehicle;
};

const deleteVehicleService = async (req) => {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) throw new NotFoundError(`Tidak ada kendaraan dengan id ${id}`);

    // Soft delete
    vehicle.deletedAt = new Date();
    await vehicle.save();

    return vehicle;
};

module.exports = {
    createVehicleService,
    getAllVehicleService,
    getAllVehicleByCityService,
    getOneVehicleService,
    updateVehicleService,
    deleteVehicleService
}
