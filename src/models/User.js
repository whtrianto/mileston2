// Mengimpor DataTypes dari Sequelize dan instance database kita
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Mendefinisikan model User
const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING, // Menggunakan STRING karena formatnya seperti "U001"
    primaryKey: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Username tidak boleh sama
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email harus unik
    validate: {
      isEmail: true // Validasi format email menggunakan Sequelize
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true, // Menambahkan created_at dan updated_at
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = User;
