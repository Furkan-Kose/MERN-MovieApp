const express = require('express');
const router = express.Router();
const { addComment, getCommentsByMovieId, deleteComment } = require('../controllers/comment');
const { verifyToken } = require('../middleware/verifyToken');

router.post('/comments', verifyToken, addComment);
router.get('/comments/:movieId', getCommentsByMovieId);
router.delete('/comments/:id', verifyToken, deleteComment);

module.exports = router;
