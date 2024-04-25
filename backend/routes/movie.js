const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie } = require('../controllers/movie');
const { verifyToken, isAdmin } = require('../middleware/verifyToken');

router.get('/movies', getAllMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', verifyToken, isAdmin, addMovie);
router.put('/movies/:id', verifyToken, isAdmin, updateMovie);
router.delete('/movies/:id', verifyToken, isAdmin, deleteMovie);

module.exports = router;
