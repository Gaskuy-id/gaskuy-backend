const { StatusCodes } = require("http-status-codes");
const { 
    getAllRentalByBranchService, 
    getOneRentalByIdService, 
    confirmRefundRequestService, 
    confirmVehicleTakenService, 
    confirmVehicleReturnService, 
    confirmFinePaidService,
    confirmationsService
} = require("../../../services/mongoose/rentals");

const getRentalController = async (req, res, next) => {
    try {
        const branchId = req.query.branchId;
        const rentalId = req.query.rentalId;

        let result = undefined;
        if(branchId){
            result = await getAllRentalByBranchService(branchId);
        }else{
            result = await getOneRentalByIdService(rentalId);
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
