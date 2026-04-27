const { Thread, User } = require('../models');

// Fungsi pembantu untuk membuat ID Thread berformat T101, T102, dst.
const generateThreadId = async () => {
  const count = await Thread.count();
  const nextId = 101 + count; // Mulai dari T101 seperti di dummy data
  return `T${nextId}`;
};

// Membuat thread baru
const createThread = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user_id = req.user.id; // Diambil dari JWT payload

    // Validasi input
    if (!title || !content) {
      return res.status(400).json({ error: 'Title dan content wajib diisi.' });
    }

    const id = await generateThreadId();

    const newThread = await Thread.create({
      id,
      user_id,
      title,
      content
    });

    res.status(201).json({
      message: 'Thread berhasil dibuat',
      thread: newThread
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Mengambil semua thread dari semua user
const getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.findAll({
      include: [{
        model: User,
        as: 'author',
        attributes: ['username'] // Menyertakan nama penulis
      }],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Mengambil thread milik user yang sedang login
const getMyThreads = async (req, res) => {
  try {
    const user_id = req.user.id;

    const threads = await Thread.findAll({
      where: { user_id },
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Mengambil detail satu thread berdasarkan ID
const getThreadById = async (req, res) => {
  try {
    const { id } = req.params;

    const thread = await Thread.findOne({
      where: { id },
      include: [{
        model: User,
        as: 'author',
        attributes: ['username']
      }]
    });

    if (!thread) {
      return res.status(404).json({ error: 'Thread tidak ditemukan.' });
    }

    res.status(200).json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Memperbarui thread (Hanya pembuat thread yang bisa)
const updateThread = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user_id = req.user.id; // User yang sedang login

    // Validasi input
    if (!title && !content) {
      return res.status(400).json({ error: 'Title atau content harus disediakan untuk update.' });
    }

    const thread = await Thread.findByPk(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread tidak ditemukan.' });
    }

    // Otorisasi: Mengecek apakah user login adalah pembuat thread
    if (thread.user_id !== user_id) {
      return res.status(403).json({ error: 'Anda tidak diizinkan untuk mengubah thread ini.' });
    }

    // Melakukan update
    thread.title = title || thread.title;
    thread.content = content || thread.content;
    await thread.save();

    res.status(200).json({
      message: 'Thread berhasil diupdate',
      thread
    });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Menghapus thread (Hanya pembuat thread yang bisa)
const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const thread = await Thread.findByPk(id);

    if (!thread) {
      return res.status(404).json({ error: 'Thread tidak ditemukan.' });
    }

    // Otorisasi: Mengecek apakah user login adalah pembuat thread
    if (thread.user_id !== user_id) {
      return res.status(403).json({ error: 'Anda tidak diizinkan untuk menghapus thread ini.' });
    }

    // Menghapus thread
    await thread.destroy();

    res.status(200).json({ message: 'Thread berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

module.exports = {
  createThread,
  getAllThreads,
  getMyThreads,
  getThreadById,
  updateThread,
  deleteThread
};
