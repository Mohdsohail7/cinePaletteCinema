const axiosInstance = require("../axios/axios");


async function getActors(movieId) {
    try {
        const response = await axiosInstance.get(`/movie/${movieId}/credits`, {
            params: { api_key: process.env.TMDB_API_KEY } 
        });
        // console.log("Actors API Response:", response.data);
        if (!response || !response.data) {
            return res.status(404).json({ error: "No actors found for this movie."});
        }
        const actors = response.data.cast.filter((person) => person.known_for_department === 'Acting').map((actor) => actor.name);
        return actors.join(', ');
    } catch (error) {
        console.error(`Error fetching actors for movie ID ${movieId}:`, error.message);
    }
}
async function searchMovie(req, res) {
    try {
        const query  = req.query.query;
        // console.log('query-->', query);
        if (!query) {
            return res.status(400).json({ error: 'query is required.'});
        }

        const response = await axiosInstance.get("/search/movie", {
            params: {
                query: query,
                api_key: process.env.TMDB_API_KEY  // ✅ Pass API key
            }
        });
        // console.log("TMDB Response:", response.data);

        if (!response || !response.data || response.data.results.length === 0) {
            return res.status(404).json({ error: "No movies found for the given query." });
        }
        // console.log("movie data-->", response);
        const movies = response.data.results.map((movie) => ({
            title: movie.title,
            tmdbId: movie.id,
            genre: movie.genre_ids.join(', '),
            releaseYear: movie.release_date ? movie.release_date.split("-")[0] : null,
            rating: movie.vote_average,
            description: movie.overview,
        }));

        for (const movie of movies) {
            movie.actors = await getActors(movie.tmdbId);
        }

        return res.status(200).json({ movies: movies });
    } catch (error) {
        return res.status(500).json({ message: 'Failed Api to fetch movies data.', error: error.message });
    }
}

module.exports = searchMovie;