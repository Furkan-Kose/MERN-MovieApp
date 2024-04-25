const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, addCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { verifyToken, isAdmin } = require('../middleware/verifyToken');

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', verifyToken, isAdmin, addCategory);
router.put('/categories/:id', verifyToken, isAdmin, updateCategory);
router.delete('/categories/:id', verifyToken, isAdmin, deleteCategory);

module.exports = router;