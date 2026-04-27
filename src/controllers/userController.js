const { User } = require('../models');

// Handler untuk melihat profil user berdasarkan ID
const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Mencari user tanpa menyertakan password_hash di respon
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'username', 'email', 'created_at']
    });

    // Jika user tidak ditemukan, kembalikan 404
    if (!user) {
      return res.status(404).json({ error: 'User tidak ditemukan.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { getUserProfile };
