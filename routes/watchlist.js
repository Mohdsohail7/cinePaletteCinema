const express = require("express");
const {movieAddToWatchlist} = require("../controllers/watchlist");
const router = express.Router();

// route for movie add to watchlist
router.post("/movies/watchlist", movieAddToWatchlist);

module.exports = router;