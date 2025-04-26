const { StatusCodes } = require('http-status-codes');

const Rental = require("../../api/v1/rental/model");
const Vehicle = require("../../api/v1/vehicle/model");
const User = require("../../api/v1/users/model");
const { BadRequestError, NotFoundError } = require('../../errors');

const checkoutService = async ({ vehicleId, customerId, withDriver, ordererName, ordererPhone, ordererEmail, startedAt, locationStart, finishedAt, locationEnd }) => {
    const vehicleCheck = await Vehicle.findById(vehicleId);
    
    if(!vehicleCheck || vehicleCheck.currentStatus != "available"){
        throw new NotFoundError("Kendaraan sudah tidak tersedia"); 
    }

    let result = undefined
    if(withDriver){
        const driverCheck = await User.findOne({
            "role": "driver",
            "driverInfo.currentAvailability": "available"
        })

        if (!driverCheck){
            throw new NotFoundError("Sopir sedang tidak tersedia");
        }
        driverCheck.driverInfo.currentAvailability = "working";
        await driverCheck.save();

        result = await Rental.create({
            customerId,
            vehicleId,
            driverId: driverCheck._id,
            branchId: vehicleCheck.branchId,
            ordererName,
            ordererPhone,
            ordererEmail,
            startedAt,
            locationStart,
            finishedAt,
            locationEnd
        })

    }else{
        result = await Rental.create({
            customerId,
            vehicleId,
            branchId: vehicleCheck.branchId,
            ordererName,
            ordererPhone,
            ordererEmail,
            startedAt,
            locationStart,
            finishedAt,
            locationEnd
        })
    }

    return result
}

module.exports = {
    checkoutService
}
