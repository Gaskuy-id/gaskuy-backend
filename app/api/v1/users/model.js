const mongoose = require("mongoose");

const driverInfoSchema = new mongoose.Schema({
    currentStatus: {type: String, enum: ["online", "offline"], default: "offline", required: true},
    currentAvailability: {type: String, enum: ["available", "working", "notAvailable"], default: "notAvailable", required: true}
}, {_id: false});

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    address: {type: String, required: true},
    role: { type: String, enum: ["admin", "driver", "customer"], default: "customer" },
    driverInfo: {type: driverInfoSchema},
    image: String
});

module.exports = mongoose.model("User", UserSchema);
