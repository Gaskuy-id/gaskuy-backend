const Branch = require("../../api/v1/branch/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createBranchService = async (data) => {
  const newBranch = await Branch.create(data);

  return newBranch;
}

const getBranchService = async () => {
  const branches = await Branch.find();

  return branches;
}

module.exports = {
  createBranchService,
  getBranchService
}
