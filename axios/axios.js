const axios = require('axios');
require('dotenv').config();

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: process.env.TMDB_API_KEY
    },
});
module.exports = axiosInstance;