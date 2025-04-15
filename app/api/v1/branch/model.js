const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  address: {type: String, required: true}
});

module.exports = mongoose.model("Branch", BranchSchema);
