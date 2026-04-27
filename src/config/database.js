// Mengimpor library Sequelize untuk koneksi database
const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Mengonfigurasi koneksi SQLite menggunakan Sequelize
const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false // Menonaktifkan logging query agar console lebih bersih
});

module.exports = sequelize;
