const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose')

const Rental = require("../../api/v1/rental/model");
const Vehicle = require("../../api/v1/vehicle/model");
const User = require("../../api/v1/users/model");
const { BadRequestError, NotFoundError } = require('../../errors');

const checkoutService = async ({ vehicleId, customerId, withDriver, ordererName, ordererPhone, ordererEmail, startedAt, locationStart, finishedAt, locationEnd }) => {
    const session = await mongoose.startSession();
    try { 
        session.startTransaction();

        const vehicleCheck = await Vehicle.findById(vehicleId);
        
        if(!vehicleCheck || vehicleCheck.currentStatus != "tersedia"){
            throw new NotFoundError("Kendaraan sudah tidak tersedia"); 
        }

        vehicleCheck.currentStatus = "tidak tersedia";
        await vehicleCheck.save( {session} );

        let result = undefined
        if(withDriver){
            const driverCheck = await User.findOne({
                "role": "driver",
                "driverInfo.currentAvailability": "tersedia"
            })

            if (!driverCheck){
                throw new NotFoundError("Sopir sedang tidak tersedia");
            }
            driverCheck.driverInfo.currentAvailability = "bekerja";
            await driverCheck.save( {session} );

            result = await Rental.create([{
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
            }],
                { session }
            )

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
            }, {session})
        }

        await session.commitTransaction();

        return result

    } catch (error){
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

const getAllRentalHistoryService = async (userId) => {
    const result = Rental.find({'customerId': userId});

    return result;
}

const getRentalHistoryDetailsService = async (_id) => {
    const result = Rental.findById(_id);

    return result;
}

const editProfileService = async (id, newData) => {
    const result = User.findOneAndUpdate({"_id": id}, newData);

    return result;
}

const getProfileService = async (id) => {
    const result = User.findById(id);

    return result;
}

module.exports = {
    checkoutService,
    getAllRentalHistoryService,
    getRentalHistoryDetailsService,
    editProfileService,
    getProfileService
}
