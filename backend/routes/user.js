const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, addUser , updateUser, deleteUser } = require('../controllers/user');
const { verifyToken, isAdmin } = require('../middleware/verifyToken');

router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.post('/users', verifyToken, isAdmin, addUser);
router.put('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);

module.exports = router;
