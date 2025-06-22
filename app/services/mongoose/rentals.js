const Rental = require("../../api/v1/rental/model");
const Vehicle = require("../../api/v1/vehicle/model");
const User = require("../../api/v1/users/model");
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllRentalByBranchService = async (branchId) => {
    let results = await Rental.find({branchId}).populate('vehicleId', 'name').populate('driverId', 'fullName phoneNumber');

    const now = new Date()
    const final_result = results.map(result => {
        const msRent = Math.max(result.finishedAt.getTime() - result.startedAt.getTime(), 0);
        const longRentHours = Math.round(msRent / 36e5);
        let amount = result.ratePerHour * longRentHours;
        const end = result.completedAt ? result.completedAt : now;
        const msLate = Math.max(end.getTime() - result.finishedAt.getTime(), 0);
        const lateHours = Math.round(msLate / 36e5);
        let penalty = lateHours * result.ratePerHour;

        if(result.driverId != undefined){
            amount += longRentHours * 25000
            penalty += lateHours * 25000
        }

        return {
            ...result.toJSON(),
            amount,
            penalty,
        };
    });

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

    const results = await Rental.find({driverId: driverId, "confirmations.paymentPaid": true}).populate('vehicleId');

    return results;
}

const getAllRentalByCustomerService = async (customerId) => {
    const customer = await User.findById(customerId);

    if (!customer){
        throw NotFoundError("Customer tidak ditemukan")
    }

    let results = await Rental.find({customerId}).populate('vehicleId', 'name').populate('driverId', 'fullName phoneNumber');

    const now = new Date()
    const final_result = results.map(result => {
        const msRent = Math.max(result.finishedAt.getTime() - result.startedAt.getTime(), 0);
        const longRentHours = Math.round(msRent / 36e5);
        let amount = result.ratePerHour * longRentHours;
        const end = result.completedAt ? result.completedAt : now;
        const msLate = Math.max(end.getTime() - result.finishedAt.getTime(), 0);
        const lateHours = Math.round(msLate / 36e5);
        let penalty = lateHours * result.ratePerHour;

        if(result.driverId != undefined){
            amount += longRentHours * 25000
            penalty += lateHours * 25000
        }

        return {
            ...result.toJSON(),
            amount,
            penalty,
        };
    });

    return final_result;
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

    if(confirmationType == "vehicleReturned" | (confirmationType == "paymentPaid" && confirmationValue == false)){
        const vehicle = await Vehicle.findById(rental.vehicleId);
        const driver = await User.findById(rental.driverId);

        vehicle.currentStatus = "tersedia";
        driver.driverInfo.currentStatus = "tersedia";

        const dateNow = new Date()
        rental.completedAt = dateNow

        if(confirmationType == "paymentPaid"){
            rental.cancelledAt = dateNow
        }

        await vehicle.save();
        await driver.save();
    }

    await rental.save()

    return rental;
}

module.exports = {
    getAllRentalByBranchService,
    getAllRentalByDriverService,
    getAllRentalByCustomerService,
    getOneRentalByIdService,
    confirmationsService
}
