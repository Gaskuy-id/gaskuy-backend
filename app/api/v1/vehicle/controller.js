const { StatusCodes } = require('http-status-codes');

// Get All, Get One By Id, Create, Update, Delete
const { createVehicleService, getAllVehicleService, getOneVehicleService, updateVehicleService, deleteVehicleService } = require("../../../services/mongoose/vehicles");

const createVehicleController = async (req, res, next) => {
  try {
    const data = req.body;

    if (req.files['mainImage']) {
      data.mainImage = req.files['mainImage'][0].filename;
    }

    if (req.files['detailImages']) {
      data.detailImages = req.files['detailImages'].map(file => file.filename);
    }

    const result = await createVehicleService(data);

    res.status(StatusCodes.CREATED).json({
      message: "Kendaraan baru telah ditambahkan", 
      vehicle: result
    })
  } catch (error) {
    next(error)
  }
}

// Get All by Branch
const getAllVehicleController = async (req, res, next) => {
  try {
    const { branch } = req.params; // ambil branch dari URL
    const result = await getAllVehicleService(branch);

    res.status(StatusCodes.OK).json({
      vehicles: result,
    });
  } catch (error) {
    next(error);
  }
}

const getOneVehicleController = async (req, res, next) => {
  try {
    const result = await getOneVehicleService(req);

    res.status(StatusCodes.OK).json({
      vehicles: result,
    })
  } catch (error) {
    next(error);
  }
}

const updateVehicleController = async (req, res, next) => {
  try {
    const result = await updateVehicleService(req);

    res.status(StatusCodes.OK).json({
      vehicles: result,
    })
  } catch (error) {
    next(error);
  }
}

const deleteVehicleController = async (req, res, next) => {
  try {
    const result = await deleteVehicleService(req);

    res.status(StatusCodes.OK).json({
      message: "Kendaraan berhasil dihapus",
      deletedAt: result.deletedAt,
      vehicle: result,
    });
  } catch (error) {
    next(error);
  }
}


module.exports = {
  createVehicleController,
  getAllVehicleController,
  getOneVehicleController,
  updateVehicleController,
  deleteVehicleController
}
