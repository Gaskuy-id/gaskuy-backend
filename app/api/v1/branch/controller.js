const { StatusCodes } = require("http-status-codes");
const { createBranch, getBranch } = require("../../../services/mongoose/branches");

const addBranch = async (req, res, next) => {
  try {
    const data = req.body;
    const newBranch = await createBranch(data);

    res.status(StatusCodes.CREATED).json({message: "Cabang baru telah ditambahkan", branch: newBranch});
  }catch (error) {
    next(error)
  }
}

const getBranch = async (req, res, next) => {
  try {
    const branches = await getBranch()
    res.status(StatusCodes.OK).json(branches)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addBranch, getBranch
}