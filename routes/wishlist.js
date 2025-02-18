const express = require("express");
const movieAddToWishlist = require("../controllers/wishlist");
const router = express.Router();

// route for add movie to wishlist
router.post("/movies/wishlist", movieAddToWishlist);

module.exports = router;