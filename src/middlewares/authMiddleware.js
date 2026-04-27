const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token JWT dari header Authorization
const authenticateUser = (req, res, next) => {
  // Mengambil header authorization
  const authHeader = req.headers.authorization;

  // Mengecek apakah header ada dan berformat Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan atau tidak valid.' });
  }

  // Mengambil token dari string (Bearer <token>)
  const token = authHeader.split(' ')[1];

  try {
    // Memverifikasi token menggunakan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Menyimpan data user yang telah di-decode ke dalam objek request
    req.user = decoded;
    next(); // Melanjutkan ke handler berikutnya
  } catch (error) {
    return res.status(403).json({ error: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
};

module.exports = { authenticateUser };
