const { StatusCodes } = require("http-status-codes");
const { createBranchService, getBranchService } = require("../../../services/mongoose/branches");

console.log('RIAN FIKRI FAKHREZI TES TES TES');

const createBranchController = async (req, res, next) => {
  try {
    const data = req.body;
    const newBranch = await createBranchService(data);

    res.status(StatusCodes.CREATED).json({message: "Cabang baru telah ditambahkan", branch: newBranch});
  }catch (error) {
    next(error)
  }
}

const getBranchController = async (req, res, next) => {
  try {
    const branches = await getBranchService()
    res.status(StatusCodes.OK).json(branches)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createBranchController, getBranchController
}