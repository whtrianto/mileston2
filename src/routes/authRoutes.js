const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Route untuk registrasi user
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Bad request (Input tidak valid)
 */
router.post('/register', register);

// Route untuk login
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user and return an authentication token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil dan mengembalikan token
 *       400:
 *         description: Bad request (Input tidak valid)
 *       401:
 *         description: Unauthorized (Email atau password salah)
 */
router.post('/login', login);

module.exports = router;
