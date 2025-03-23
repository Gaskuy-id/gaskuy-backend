const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  domicile: {type: String, required: true},
  image: String
});

module.exports = mongoose.model("User", UserSchema);
