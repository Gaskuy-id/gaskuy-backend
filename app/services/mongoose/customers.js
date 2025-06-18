const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');

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
                "driverInfo.currentStatus": "tersedia",
                "driverInfo.branch": vehicleCheck.branchId
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

const checkPaymentConfirmationService = async (id) => {
    const result = await Rental.findById(id);

    console.log(result)

    return result.confirmations == undefined ? false : result.confirmations.paymentPaid;
}

const getAllRentalHistoryService = async (userId) => {
    const results = await Rental.find({customerId: userId}).populate('vehicleId');

    let now = new Date()
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

const getRentalHistoryDetailsService = async (_id) => {
    const result = await Rental.findById(_id);
    return result;
}

const editProfileService = async (id, newData) => {
    try {
        // Only allow specific fields to be updated for customer profile
        const allowedFields = ['fullName', 'phoneNumber', 'address', 'image'];
        const updateData = {};
        
        // Filter only allowed fields
        allowedFields.forEach(field => {
            if (newData[field] !== undefined) {
                updateData[field] = newData[field];
            }
        });

        // Validate that we have at least one field to update
        if (Object.keys(updateData).length === 0) {
            throw new BadRequestError("Tidak ada data yang diupdate");
        }

        const result = await User.findOneAndUpdate(
            { "_id": id }, 
            updateData,
            { new: true, runValidators: true }
        );

        if (!result) {
            throw new NotFoundError("User tidak ditemukan");
        }

        return result;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new BadRequestError(error.message);
        }
        throw error;
    }
}

const getProfileService = async (id) => {
    try {
        const result = await User.findById(id);
        
        if (!result) {
            throw new NotFoundError("User tidak ditemukan");
        }

        return result;
    } catch (error) {
        if (error.name === 'CastError') {
            throw new BadRequestError("ID user tidak valid");
        }
        throw error;
    }
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
    const result = await Rental.findOneAndUpdate(
        {_id: _id}, 
        {$set: {
            rating: rating,
            review: review
        }},
        { new: true }
    );
    
    return result;
}

module.exports = {
    checkoutService,
    checkPaymentConfirmationService,
    getAllRentalHistoryService,
    getRentalHistoryDetailsService,
    editProfileService,
    getProfileService,
    getAvailableVehiclesService,
    createRentalReview
};