// 1] import dulu mongoose
const mongoose = require('mongoose');

// 2] import konfigurasi terkait MongoDB dari app/config/index.js
const { dbUri } = require('../config');

// 3] connect ke MongoDb pakai konfigurasi yang udah diimport
mongoose.connect(dbUri+"replicaSet=rs");

// 4] simpan koneksinya kedalam constant db
const db = mongoose.connection;

// 5] export db agar bisa dipakai oleh file lain yang membutuhkan
module.exports = db;
