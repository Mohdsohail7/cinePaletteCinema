const { Movie, Wishlist } = require("../models");
const fetchMovieAndCastDetails = require("./fetchMovieAndCastDetails");
const movieExistsInDB = require("./movieExistsInDB");

async function movieAddToWishlist(req, res) {
    const { movieId } = req.body;
    // validate input
    if (!movieId) {
        return res.status(400).json({ message: "Movie id is required."});
    }

    try {
        // firstly check movie is exist in database
        const movieExist = await movieExistsInDB(movieId);
        let movieDetails;

        if (!movieExist) {
            // we are fetching movie details from TDMB here because condition true movie doesn't exist
            movieDetails = await fetchMovieAndCastDetails(movieId);

            // create a new movie entry in our database
            movieExist = await Movie.create({
                tmdbId: movieId,
                title: movieDetails.title,
                genre: movieDetails.genre,
                releaseYear: movieDetails.releaseYear,
                description: movieDetails.description,
                rating: movieDetails.rating,
                actors: movieDetails.actors
            });
        }
        // add movie to wishlist
        await Wishlist.create({ movieId: movieExist.id });

        // response
        return res.status(201).json({ message: "Movie added to wishlist successfully."});
    } catch (error) {
        return res.status(500).json({ message: "Failed to add movie to wishlist."});
    }

}
module.exports = movieAddToWishlist;