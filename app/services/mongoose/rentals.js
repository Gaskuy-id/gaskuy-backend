const Rental = require("../../api/v1/rental/model");
const Branch = require("../../api/v1/branch/model");
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllRentalByBranchService = async (branchId) => {
    const results = await Rental.find({branchId});

    return results;
}

const getOneRentalByIdService = async (rentalId) => {
    const result = await Rental.findById(rentalId);

    return result;
}

module.exports = {
    getAllRentalByBranchService,
    getOneRentalByIdService
}
