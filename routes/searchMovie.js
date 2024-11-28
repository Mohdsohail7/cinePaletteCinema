const express = require('express');
const searchMovie = require('../controllers/searchMovie');
const router = express.Router();

// get movies from tdmb
router.get('/movies/search', searchMovie);

module.exports = router;