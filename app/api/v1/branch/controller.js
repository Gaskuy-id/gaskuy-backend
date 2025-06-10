const { StatusCodes } = require("http-status-codes");
const { createBranchService, getAllBranchService } = require("../../../services/mongoose/branches");

const createBranchController = async (req, res, next) => {
  try {
    const data = req.body;
    const newBranch = await createBranchService(data);

    res.status(StatusCodes.CREATED).json({message: "Cabang baru telah ditambahkan", branch: newBranch});
  }catch (error) {
    next(error)
  }
}

const getAllBranchController = async (req, res, next) => {
  try {
    const branches = await getAllBranchService()
    res.status(StatusCodes.OK).json(branches)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBranchController, getAllBranchController
}