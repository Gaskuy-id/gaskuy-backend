const Rental = require("../../api/v1/rental/model");
const Branch = require("../../api/v1/branch/model");
const Vehicle = require("../../api/v1/vehicle/model");
const User = require("../../api/v1/users/model")
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllRentalByBranchService = async (branchId) => {
    let results = await Rental.find({branchId}).populate('vehicleId').populate('driverId');

    let final_result = []
    for (let i=0; i< results.length; i++){
        const result = results[i]
        const longRent = Math.abs(result.startedAt - result.finishedAt)/36e5
        const amount = result.vehicleId.ratePerHour * longRent
        const end = result.completedAt==undefined ? now : result.finishedAt
        const penalty = Math.abs(result.startedAt - end)/36e5

        final_result.push({
            ...result.toJSON(),
            amount,
            penalty,
        })
    }

    return final_result;
}

const getOneRentalByIdService = async (rentalId) => {
    const result = await Rental.findById(rentalId);

    return result;
}

const getAllRentalByDriverService = async (driverId) => {
    const driver = await User.findById(driverId);

    if (!driver || driver.driverInfo == undefined){
        throw NotFoundError("Driver tidak ditemukan")
    }

    const results = await Rental.find({driverId: driverId});

    return results;
}

const confirmationsService = async (rentalId, confirmationType, confirmationValue) => {
    const CONFIRMATION_FIELDS = ["vehicleTaken", "vehicleReturned", "paymentPaid", "hasFine", "finePaid"];
    if(rentalId==undefined | confirmationType==undefined | confirmationValue==undefined){
        throw new BadRequestError("Data tidak lengkap");
    }

    const rental = await Rental.findById(rentalId);

    if (!rental) {
        throw new BadRequestError("Rental tidak valid");
    }

    if (!CONFIRMATION_FIELDS.includes(confirmationType)) {
        throw new BadRequestError("Tipe konfirmasi tidak valid");
    }

    const currentValue = rental.confirmations?.[confirmationType];
    if (currentValue !== undefined) {
        throw new BadRequestError(`Konfirmasi ${confirmationType} sudah dilakukan`);
    }

    rental.confirmations = {
        ...(rental.confirmations || {}),
        [confirmationType]: confirmationValue,
    };
    await rental.save()

    return rental;
}

module.exports = {
    getAllRentalByBranchService,
    getAllRentalByDriverService,
    getOneRentalByIdService,
    confirmationsService
}
