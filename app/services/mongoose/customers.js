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

        const transactionId = Array.from({length: 6}, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]).join('');
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
                "driverInfo.currentStatus": "tersedia"
            })

            if (!driverCheck){
                throw new NotFoundError("Sopir sedang tidak tersedia");
            }

            driverCheck.driverInfo.currentStatus = "bekerja";
            await driverCheck.save( {session} );

            result = await Rental.create([{
                transactionId: transactionId,
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
            result = await Rental.create([{
                transactionId: transactionId,
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
            }], 
            {session}
        )
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

const getAvailableVehiclesService = async (city, currentStatus, passengerCount) => {
    const vehicles = await Vehicle.aggregate([
        {
            $lookup: {
                from: "branches",
                localField: "branchId",
                foreignField: "_id",
                as: "branch"
            },
        },
        {
            $unwind: "$branch" 
        },
        {
            $match: {
            "branch.city": city,
            seat: { $gte: Number(passengerCount) },
            "currentStatus": currentStatus
            }
        }
    ]);

    return vehicles;
}

const createRentalReview = async (_id, rating, review) => {
    rental.findOneAndUpdate(
        {_id: _id}, 
        {$set: {
            rating: rating,
            review: review
        }})
}

module.exports = {
    checkoutService,
    getAllRentalHistoryService,
    getRentalHistoryDetailsService,
    editProfileService,
    getProfileService,
    getAvailableVehiclesService
}
