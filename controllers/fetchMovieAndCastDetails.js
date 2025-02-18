const axiosInstance = require("../axios/axios")
require("dotenv").config();


const fetchMovieAndCastDetails = async (tmdbId) => {
    try {
        const movieResponse = await axiosInstance.get(`/movie/${tmdbId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY // pass API key in query params
            }
        });
        const castResponse = await axiosInstance.get(`/movie/${tmdbId}/credits`, {
            params: {
                api_key: process.env.TMDB_API_KEY // pass API key in query params
            }
        });

        const movieData = movieResponse.data;
        const castData = castResponse.data.cast.slice(0, 5).map((actor) => actor.name).join(", ");

        return {
            title: movieData.title,
            genre: movieData.genres.map(genre => genre.name).join(", "),
            releaseYear: movieData.release_date ? movieData.release_date.split('-')[0] : null,
            description: movieData.overiew,
            rating: movieData.vote_average,
            actors: castData
        }
    } catch (error) {
        console.error('Error fetching movie and cast details:', error);
        throw new Error('Failed to fetch movie data from TMDB');
    }
}
module.exports = fetchMovieAndCastDetails;