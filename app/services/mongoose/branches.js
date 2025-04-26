const Branch = require("../../api/v1/branch/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const createBranchService = async (data) => {
  const name = data.name;
  const check = await Branch.findOne({name});

  if(check) throw new BadRequestError('Nama Cabang Sudah Ada/Duplikat');

  const result = await Branch.create(data);

  return result;
}

const getAllBranchService = async () => {
  const result = await Branch.find();

  return result;
}

module.exports = {
  createBranchService,
  getAllBranchService
}
