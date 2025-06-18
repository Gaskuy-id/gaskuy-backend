const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const DriverInfoSchema = new mongoose.Schema({
  currentStatus: {
    type: String,
    enum: ["tersedia", "bekerja", "tidak tersedia"],
    default: "tidak tersedia",
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
  },
}, { _id: false, timestamps: true });

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "driver", "customer"],
    default: "customer"
  },
  driverInfo: { type: DriverInfoSchema },
  deletedAt: { type: Date, default: null },
  image: {type: String},
}, { timestamps: true });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
