// Mengimpor DataTypes dari Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Mendefinisikan model Thread
const Thread = sequelize.define('Thread', {
  id: {
    type: DataTypes.STRING, // Menggunakan STRING karena formatnya seperti "T101"
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'threads',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Thread;
