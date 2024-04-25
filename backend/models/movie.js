const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    year: { type: Number },
    category: { type: Array },
    image: { type: String },
    comments: { type: Array },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
