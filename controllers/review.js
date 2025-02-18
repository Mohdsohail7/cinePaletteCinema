const { Review, Movie } = require("../models");

async function addReviewAndRating(req, res) {
    const { movieId } = req.params;
    // input validation
    if (!movieId) {
        return res.status(400).json({ message: "movie Id is required."});
    }
    const { rating, reviewText } = req.body;
    // Validate rating (must be a float between 0 and 10)
    if (typeof rating !== "number" || rating < 0 || rating > 10) {
        return res.status(400).json({ message: "Rating must be a float between 0 and 10."});
    }
    // Validate reviewText (must be at most 500 characters)
    if (typeof reviewText !== "string" || reviewText.length > 500) {
        return res.status(400).json({ message: "Review text must not exceed 500 characters."})
    }
    try {
        // find movie
        const movie = await Movie.findOne({ where: { tmdbId: movieId }});
        
        if (!movie) {
            return res.status(404).json({ message: "Movie not found."});
        }
        // create review and rating
        const ratingAndReview = await Review.create({ movieId, rating, reviewText });
        if (!ratingAndReview) {
            return res.status(400).json({ message: "Failed to create rating and review." });
        }

        // return successfull response
        return res.status(201).json({ message: "Review added successfully."});
    } catch (error) {
        return res.status(500).json({ message: "failed to add Review."});
    }
}

module.exports = addReviewAndRating;