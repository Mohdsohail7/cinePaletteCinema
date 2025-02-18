const express = require("express");
const addReviewAndRating = require("../controllers/review");
const router = express.Router();

// route for add review and rating
router.post("/movies/:movieId/reviews", addReviewAndRating);

module.exports = router;