const express = require('express');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

// Route untuk melihat profil user
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: View a user's public profile based on their ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID user (contoh U001)
 *     responses:
 *       200:
 *         description: Profil user ditemukan
 *       404:
 *         description: User tidak ditemukan
 */
router.get('/:id', getUserProfile);

module.exports = router;
