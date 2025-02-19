const { Watchlist, Wishlist, CuratedList, Movie, Review } = require("../models");

async function sortMovies(req, res) {
    const { list, sortBy, order } = req.query;

    // Validate the list parameter
    if (!list || !["watchlist", "wishlist", "curatedlist"].includes(list.toLowerCase())) {
        return res.status(400).json({ message: "Invalid list. Allowed values are watchlist, wishlist, curatedlist." });
    }

    // Validate the sortBy parameter
    if (!sortBy || !["rating", "releaseYear"].includes(sortBy.toLowerCase())) {
        return res.status(400).json({ message: "Invalid sortBy. Allowed values are rating, releaseYear." });
    }

    // Validate the order parameter
    if (!order || !["ASC", "DESC"].includes(order.toUpperCase())) {
        return res.status(400).json({ message: "Invalid order. Allowed values are ASC, DESC." });
    }

    try {
        // Determine the model based on the list type
        // let ListModel;
        // switch (list.toLowerCase()) {
        //     case "watchlist":
        //         ListModel = Watchlist;
        //         break;
        //     case "wishlist":
        //         ListModel = Wishlist;
        //         break;
        //     case "curatedlist":
        //         ListModel = CuratedList;
        //         break;
        //     default:
        //         return res.status(400).json({ message: "Invalid list type." });
        // }

        // map list name to corresponding models
        const listModelMap = {
            watchlist: Watchlist,
            wishlist: Wishlist,
            curatedList: CuratedList
        }
        const ListModel = listModelMap[list.toLowerCase()];

        // Fetch movies with sorting applied
        const movies = await ListModel.findAll({
            include: {
                model: Movie,
                attributes: ["title", "tmdbId", "genre", "actors", "releaseYear", "rating"], // Only fetch necessary fields
            },
            order: [[Movie, sortBy, order.toUpperCase()]], // Sorting applied at the main query level
        });

        // Extract movie data
        const movieData = movies
            .map(entry => entry.Movie)
            .filter(movie => movie !== null); // Ensure no null values

        // Check if movies are found
        if (movieData.length === 0) {
            return res.status(404).json({ message: `No movies found in the ${list}.` });
        }

        return res.status(200).json({ movies: movieData });

    } catch (error) {
        console.error("Error sorting movies:", error);
        return res.status(500).json({ message: "Failed to sort movies.", error: error.message });
    }
}

async function topFiveMovieRatingWithDetailsReview(req, res) {
    try {
        // Fetch top 5 highest-rated movies with their reviews
        const topFiveMovies = await Movie.findAll({
            order: [["rating", "DESC"]], // fetching highest rating movies
            limit: 5, // only top five movies
            include: [{
                model: Review,
                attributes: ["reviewText"] // fetched only review text
            }]
        });

        // If no movies are found
        if (!topFiveMovies || topFiveMovies.length === 0) {
            return res.status(404).json({ message: "No top-rated movies found." });
        }

        // Process movies and calculate word count
        const formattedMovies = topFiveMovies.map(movie => {
            // Get the first review's text if available
            const reviewText = movie.Reviews && movie.Reviews.length > 0 ? movie.Reviews[0].reviewText : "";
            
            // Count words properly
            const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0;

            return {
                title: movie.title,
                rating: movie.rating,
                review: {
                    text: reviewText,
                    wordCount: wordCount
                }
            };
        });

        return res.status(200).json({ movies: formattedMovies });

    } catch (error) {
        console.error("Error fetching top 5 movies:", error);
        return res.status(500).json({ message: "Failed to fetch top five movies.", error: error.message });
    }
}

module.exports = { sortMovies, topFiveMovieRatingWithDetailsReview };
