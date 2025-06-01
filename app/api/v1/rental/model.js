const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
        customerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
        driverId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},    
        vehicleId: {type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true},
        branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true},
        ordererName: {type: String, required: true},
        ordererPhone: {type: String, required: true},
        ordererEmail: {type: String, required: true},
        note: {type: String},
        bookedAt: {type: Date},
        cancelledAt: {type: Date},
        startedAt: {type: Date},
        locationStart: {type: String, required: true},
        ratePerHour: {type: Number},
        finishedAt: {type: Date},
        locationEnd: {type: String, required: true},
        rating: {type: Number},
        review: {type: String}
    },
        { timestamps: true }
);

module.exports = mongoose.model("Rental", RentalSchema);
