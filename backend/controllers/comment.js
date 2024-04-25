const Comment = require('../models/comment');


const addComment = async (req, res) => {
  const { movieId, userId, username, text } = req.body;

  try {
    const newComment = new Comment({ movieId, userId, username, text });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getCommentsByMovieId = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const movieComments = await Comment.find({ movieId });
    res.status(200).json(movieComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: 'Comment not found!'});
    }
    res.status(200).json({ message: 'Comment deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { addComment, getCommentsByMovieId, deleteComment };
