const { Movie } = require("../models");


const movieExistsInDB = async (tmdbId) => {
    try {
        const movie = await Movie.findOne({ where: { tmdbId } });
        return movie; 
    } catch (error) {
        console.error("Error checking movie in DB:", error);
        return null;
    }
};
module.exports = movieExistsInDB;