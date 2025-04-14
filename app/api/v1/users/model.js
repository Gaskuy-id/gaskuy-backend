const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  address: {type: String, required: true},
  role: { type: String, enum: ["admin", "driver", "customer"], default: "customer" },
  image: String
});

module.exports = mongoose.model("User", UserSchema);
