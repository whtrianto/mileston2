const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Fungsi pembantu untuk membuat ID berformat U001, U002, dst.
const generateUserId = async () => {
  const count = await User.count();
  const nextId = count + 1;
  return `U${nextId.toString().padStart(3, '0')}`;
};

// Handler untuk registrasi user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input kosong
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, dan password wajib diisi.' });
    }

    // Mengecek apakah email atau username sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email sudah terdaftar.' });
    }

    // Menghash password menggunakan bcryptjs
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Menghasilkan ID unik
    const id = await generateUserId();

    // Menyimpan user baru ke database
    const newUser = await User.create({
      id,
      username,
      email,
      password_hash
    });

    res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Format email tidak valid.' });
    }
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Handler untuk login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input kosong
    if (!email || !password) {
      return res.status(400).json({ error: 'Email dan password wajib diisi.' });
    }

    // Mencari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah.' });
    }

    // Membandingkan password input dengan password hash di database
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email atau password salah.' });
    }

    // Membuat token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token berlaku 1 hari
    );

    res.status(200).json({
      message: 'Login berhasil',
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = { register, login };
