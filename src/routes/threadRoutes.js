const express = require('express');
const { 
  createThread, 
  getAllThreads, 
  getMyThreads, 
  getThreadById, 
  updateThread, 
  deleteThread 
} = require('../controllers/threadController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// --- Route yang tidak memerlukan autentikasi ---
/**
 * @swagger
 * /api/threads:
 *   get:
 *     summary: List all threads from all users
 *     tags: [Threads]
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar thread
 */
router.get('/', getAllThreads);

/**
 * @swagger
 * /api/threads/{id}:
 *   get:
 *     summary: View details of a specific thread by its ID
 *     tags: [Threads]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID thread (contoh T101)
 *     responses:
 *       200:
 *         description: Detail thread
 *       404:
 *         description: Thread tidak ditemukan
 */
router.get('/:id', getThreadById);

// --- Route yang memerlukan autentikasi ---
// Gunakan middleware authenticateUser untuk rute-rute di bawah ini

/**
 * @swagger
 * /api/threads/my-threads:
 *   get:
 *     summary: List threads belonging to the currently logged-in user
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil daftar thread milik user
 *       401:
 *         description: Akses ditolak (Unauthorized)
 */
router.get('/my-threads', authenticateUser, getMyThreads);

/**
 * @swagger
 * /api/threads:
 *   post:
 *     summary: Create a new thread/question
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Thread berhasil dibuat
 *       400:
 *         description: Bad request (Input tidak valid)
 *       401:
 *         description: Akses ditolak (Unauthorized)
 */
router.post('/', authenticateUser, createThread);

/**
 * @swagger
 * /api/threads/{id}:
 *   put:
 *     summary: Update the content of a thread (Only accessible by the thread creator)
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID thread
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thread berhasil diupdate
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Bukan pembuat thread)
 *       404:
 *         description: Thread tidak ditemukan
 */
router.put('/:id', authenticateUser, updateThread);

/**
 * @swagger
 * /api/threads/{id}:
 *   delete:
 *     summary: Delete a thread (Only accessible by the thread creator)
 *     tags: [Threads]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID thread
 *     responses:
 *       200:
 *         description: Thread berhasil dihapus
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Bukan pembuat thread)
 *       404:
 *         description: Thread tidak ditemukan
 */
router.delete('/:id', authenticateUser, deleteThread);

module.exports = router;
