const { StatusCodes } = require("http-status-codes");
const { createBranch, getBranch } = require("../../../services/mongoose/branches");

exports.addBranch = async (req, res, next) => {
  try {
    const data = req.body;
    const newBranch = await createBranch(data);

    res.status(StatusCodes.CREATED).json({message: "Branch added successfully!", branch: newBranch});
  }catch (error) {
    next(error)
  }
}

exports.getBranch = async (req, res, next) => {
  try {
    const branches = await getBranch()
    res.status(StatusCodes.OK).json(branches)
  } catch (error) {
    next(error)
  }
}
