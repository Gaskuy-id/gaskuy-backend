const { StatusCodes } = require('http-status-codes');
const { createVehicleService, getAllVehicleService, getAllVehicleByCityService, getOneVehicleService, updateVehicleService, deleteVehicleService } = require("../../../services/mongoose/vehicles");

const createVehicleController = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await createVehicleService(data);

    res.status(StatusCodes.CREATED).json({
      message: "Kendaraan baru telah ditambahkan", 
      vehicle: result
    });
  } catch (error) {
    next(error);
  }
};

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

// Get All by City
const getAllVehicleByCityController = async (req, res, next) => {
  try {
    const { city } = req.params; // ambil branch dari URL
    const result = await getAllVehicleByCityService(city);

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
    const { id } = req.params;
    const data = req.body;
    
    const result = await updateVehicleService({ params: { id }, body: data });

    res.status(StatusCodes.OK).json({
      message: "Kendaraan berhasil diperbarui",
      vehicle: result,
    });
  } catch (error) {
    next(error);
  }
};

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
  getAllVehicleByCityController,
  getOneVehicleController,
  updateVehicleController,
  deleteVehicleController
}
