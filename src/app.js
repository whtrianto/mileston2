const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const threadRoutes = require('./routes/threadRoutes');

const app = express();

// Middleware
app.use(cors()); // Mengaktifkan CORS
app.use(express.json()); // Memparsing request body berformat JSON

// Konfigurasi Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Q&A Forum API',
      version: '1.0.0',
      description: 'API for a Simple Q&A Forum application'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  // Lokasi file yang mengandung anotasi Swagger
  apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mendaftarkan routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/threads', threadRoutes);

// Middleware untuk endpoint yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
});

module.exports = app;
