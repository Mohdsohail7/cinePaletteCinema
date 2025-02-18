const express = require('express');
const {searchMovie, searchMovieByGenreAndActor } = require('../controllers/searchMovie');
const router = express.Router();

// get movies from tdmb
router.get('/movies/search', searchMovie);

// route for search movie based on genre and actor
router.get("/movies/searchByGenreAndActor", searchMovieByGenreAndActor);

module.exports = router;