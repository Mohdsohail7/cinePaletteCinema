const express = require("express");
const sortMovies = require("../controllers/sortMovie");
const router = express.Router();

// route for sort movie base on rating and release year
router.get("/movies/sort", sortMovies);

module.exports = router;