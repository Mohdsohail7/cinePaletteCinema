const axios = require('axios');
require('dotenv').config();

// console.log("TMDB_API_KEY:", process.env.TMDB_API_KEY);

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        "Content-Type": "application/json"
    },
});
// console.log("tdmb-->", axiosInstance);
module.exports = axiosInstance;