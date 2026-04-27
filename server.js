const app = require('./src/app');
const { sequelize } = require('./src/models');
const bcrypt = require('bcryptjs');
const { User, Thread } = require('./src/models');

const PORT = process.env.PORT || 3000;

// Fungsi untuk mengisi database dengan dummy data sesuai requirement
const seedData = async () => {
  try {
    const userCount = await User.count();
    if (userCount === 0) {
      console.log('Menyisipkan dummy data...');
      
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash('password123', salt); // Gunakan password sederhana untuk dummy

      await User.bulkCreate([
        {
          id: 'U001',
          username: 'johndoe',
          email: 'johndoe@example.com',
          password_hash,
          created_at: '2026-04-20T10:00:00Z',
          updated_at: '2026-04-20T10:00:00Z'
        },
        {
          id: 'U002',
          username: 'janedoe',
          email: 'jane@example.com',
          password_hash,
          created_at: '2026-04-21T14:30:00Z',
          updated_at: '2026-04-21T14:30:00Z'
        }
      ]);

      await Thread.bulkCreate([
        {
          id: 'T101',
          user_id: 'U001',
          title: 'How do I set up environment variables in Node.js?',
          content: 'I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?',
          created_at: '2026-04-22T08:15:00Z',
          updated_at: '2026-04-22T08:15:00Z'
        },
        {
          id: 'T102',
          user_id: 'U002',
          title: 'When should I use PostgreSQL vs MongoDB?',
          content: 'For a medium-scale e-commerce project, which database is more recommended and why?',
          created_at: '2026-04-22T09:45:00Z',
          updated_at: '2026-04-22T10:00:00Z'
        },
        {
          id: 'T103',
          user_id: 'U001',
          title: 'Getting a CORS error when hitting the API from React',
          content: "I keep getting an 'Access-Control-Allow-Origin' error. How do I handle this on the Express.js side?",
          created_at: '2026-04-22T11:20:00Z',
          updated_at: '2026-04-22T11:20:00Z'
        }
      ]);

      console.log('Dummy data berhasil disisipkan.');
    }
  } catch (error) {
    console.error('Gagal menyisipkan dummy data:', error);
  }
};

// Sinkronisasi database dan menjalankan server
const startServer = async () => {
  try {
    // Mengecek koneksi ke database
    await sequelize.authenticate();
    console.log('Koneksi ke database berhasil.');

    // Sinkronisasi model dengan tabel database
    // Menggunakan alter: true agar tabel otomatis terupdate jika model berubah (berguna saat development)
    await sequelize.sync({ alter: true });
    console.log('Model berhasil disinkronisasi.');

    // Jalankan seeder
    await seedData();

    // Memulai server
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
      console.log(`Dokumentasi API tersedia di http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Tidak dapat menghubungkan ke database:', error);
  }
};

startServer();
