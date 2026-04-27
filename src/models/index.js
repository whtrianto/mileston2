// Mengimpor koneksi database dan model-model
const sequelize = require('../config/database');
const User = require('./User');
const Thread = require('./Thread');

// Mendefinisikan relasi One-to-Many antara User dan Thread
// Satu User dapat memiliki banyak Thread
User.hasMany(Thread, {
  foreignKey: 'user_id',
  as: 'threads' // Alias untuk relasi
});

// Sebuah Thread dimiliki oleh satu User
Thread.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'author'
});

module.exports = {
  sequelize,
  User,
  Thread
};
