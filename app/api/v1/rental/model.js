const mongoose = require("mongoose");

const ConfirmationsSchema = new mongoose.Schema({
    paymentPaid: {type: Boolean},
    vehicleTaken: {type: Boolean},
    vehicleReturned: {type: Boolean},
    hasFine: {type: Boolean},
    finePaid: {type: Boolean}
}, {
    _id: false
})

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
        completedAt: {type: Date},
        rating: {type: Number},
        review: {type: String},
        confirmations: {type: ConfirmationsSchema}
    },
        { timestamps: true }
);

module.exports = mongoose.model("Rental", RentalSchema);
