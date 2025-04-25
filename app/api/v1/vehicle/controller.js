const { StatusCodes } = require('http-status-codes');

const { createVehicle, getVehicle, getVehicleByBranch } = require("../../../services/mongoose/vehicles");

const handleCreateVehicle = async (req, res, next) => {
  try {
    const data = req.body;

    const newVehicle = await createVehicle(data);

    res.status(StatusCodes.CREATED).json({message: "Kendaraan baru telah ditambahkan", vehicle: newVehicle})
  } catch (error) {
    next(error)
  }
}

const handleGetVehicle = async (req, res, next) => {
  try {
    const { city, currentStatus, passengerCount } = req.query;

    const vehicles = await getVehicle(city, currentStatus, passengerCount)

    res.status(StatusCodes.OK).json(vehicles)
  } catch (error) {
    next(error)
  }
}

const handleGetVehicleByBranchName = async (req, res, next) => {
  try {
    const { branchName } = req.params;
    const vehicles = await getVehicleByBranch(branchName);

    res.status(StatusCodes.OK).json(vehicles)
  } catch (error) {
    next(error);
  }
}
module.exports = {
  handleCreateVehicle,
  handleGetVehicle,
  handleGetVehicleByBranchName
}
