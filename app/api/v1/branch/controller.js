const { StatusCodes } = require("http-status-codes");
const { createBranchServices, getBranchServices } = require("../../../services/mongoose/branches");

const createBranchController = async (req, res, next) => {
  try {
    const data = req.body;
    const newBranch = await createBranchServices(data);

    res.status(StatusCodes.CREATED).json({message: "Cabang baru telah ditambahkan", branch: newBranch});
  }catch (error) {
    next(error)
  }
}

const getBranchController = async (req, res, next) => {
  try {
    const branches = await getBranchServices()
    res.status(StatusCodes.OK).json(branches)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBranchController, getBranchController
}