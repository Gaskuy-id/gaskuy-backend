const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  name: {type: String, required: true},
  transmission: {type: String, enum: ["automatic", "manual"], required: true},
  year: {type: Number, required: true},
  kilometer: {type: Number, required: true},
  engineCapacity: {type: Number, required: true},
  seat: {type: Number, required: true},
  luggage: {type: Number, required: true},
  branchId: {type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true},
  ratePerHour: {type: Number, required: true},
  currentStatus: { type: String, enum: ["tersedia", "tidak tersedia", "maintenance"], default: "tersedia" },
  lastMaintenance: { type: Date },
  fuel: { type: String },
  mainImage: { type: String },
  detailImages: [{ type: String }],
  deletedAt: { type: Date, default: null }
  },
      { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
