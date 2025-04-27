const { StatusCodes } = require("http-status-codes");
const { getAllRentalByBranchService, getOneRentalByIdService } = require("../../../services/mongoose/rentals");

const getRentalController = async (req, res, next) => {
    try {
        const branchId = req.query.branchId;
        const rentalId = req.query.rentalId;

        if(branchId){
            result = getAllRentalByBranchService(branchId);
        }else{
            result = getOneRentalByIdService(rentalId);
        }
        
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getRentalController
}
