const express = require("express");
const { sortMovies, topFiveMovieRatingWithDetailsReview, } = require("../controllers/sortMovie");
const router = express.Router();

// route for sort movie base on rating and release year
router.get("/movies/sort", sortMovies);

// route for top 5 movies rating plus with review detaisl
router.get("/movies/top5", topFiveMovieRatingWithDetailsReview);

module.exports = router;