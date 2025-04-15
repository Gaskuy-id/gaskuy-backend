const Branch = require("../../api/v1/branch/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createBranch = async (data) => {
  const newBranch = await Branch.create(data);

  return newBranch;
}

const getBranch = async () => {
  const branches = await Branch.find();

  return branches;
}

module.exports = {
  createBranch,
  getBranch
}
