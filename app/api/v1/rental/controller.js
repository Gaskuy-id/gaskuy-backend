const { StatusCodes } = require("http-status-codes");
const { 
    getAllRentalByBranchService, 
    getOneRentalByIdService,
    getAllRentalByDriverService,
    confirmationsService
} = require("../../../services/mongoose/rentals");

const getRentalController = async (req, res, next) => {
    try {
        const branchId = req.query.branchId;
        const rentalId = req.query.rentalId;
        const driverId = req.query.driverId;

        let result = undefined;
        if(rentalId){
            result = await getOneRentalByIdService(rentalId);
        }else if (driverId){
            result = await getAllRentalByDriverService(driverId);
        }else if (branchId){
            result = await getAllRentalByBranchService(branchId);
        }
        
        res.status(StatusCodes.OK).json({data: result})
    } catch (error) {
        next(error)
    }
}

const confirmationsController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { confirmationType, confirmationValue } = req.body;

        const result = await confirmationsService(id, confirmationType, confirmationValue)

        res.status(StatusCodes.OK).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getRentalController,
  confirmationsController,
}
