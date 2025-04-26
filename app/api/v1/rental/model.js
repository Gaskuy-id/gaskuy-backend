const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    driverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},    
    vehicleId: {type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true},
    branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true},
    bookedAt: {type: Date},
    cancelledAt: {type: Date},
    startedAt: {type: Date},
    locationStart: {type: String, required: true},
    duration: {type: Number},
    ratePerHour: {type: Number},
    finishedAt: {type: Date},
    locationEnd: {type: String, required: true},
    rating: {type: Number},
    review: {type: String}
});

module.exports = mongoose.model("Rental", RentalSchema);
