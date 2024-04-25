const Movie = require('../models/movie');


const getAllMovies = async (req, res) => {
  try {
    const category = req.query.category;

    const searchTerm = req.query.search;

    const query = category ? { category } : {};

    if (searchTerm) {
      query.name = { $regex: new RegExp(searchTerm, 'i') };
    }

    const movies = await Movie.find(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addMovie = async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    description: req.body.description,
    year: req.body.year,
    category: req.body.category,
    image: req.body.image,
    comments: req.body.comments,
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateMovie = async (req, res) => {
  const { name, description, year, category, image } = req.body;
  try {
    const existingMovie = await Movie.findById(req.params.id);
    if(!existingMovie) return res.status(404).json({ message: "Movie not found" });

    existingMovie.name = name;
    existingMovie.description = description;
    existingMovie.year = year;
    existingMovie.category = category;
    existingMovie.image = image;

    const updatedMovie = await existingMovie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
