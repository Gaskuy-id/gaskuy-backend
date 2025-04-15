const Vehicle = require("../../api/v1/vehicle/model");
const Branch = require("../../api/v1/branch/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createVehicle = async (data) => {
  const { branchId } = data;
  
  const branch = await Branch.findById(branchId);

  if(!branch){
    throw new NotFoundError("Branch tidak valid");
  }

  const newVehicle = await Vehicle.create(data);
  
  return newVehicle;
}

const getVehicle = async (city, currentStatus, passengerCount) => {
  const vehicles = await Vehicle.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branch"
      },
    },
    {
      $unwind: "$branch" 
    },
    {
      $match: {
        "branch.city": city,
        seat: { $gte: Number(passengerCount) },
        "currentStatus": currentStatus
      }
    }
  ]);

  return vehicles;
}

const getVehicleByBranch = async (branchName) => {
  const vehicles = await Vehicle.aggregate([
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branch"
      },
    },
    {
      $unwind: "$branch" 
    },
    {
      $match: {
        "branch.name": branchName,
      }
    }
  ]);

  return vehicles;
}

module.exports = {
  createVehicle,
  getVehicle,
  getVehicleByBranch
}
