const express = require("express");
const { sequelize, connectDB } = require("./config/database");
const Movie = require("./models/movie");
const moviesData = require("./data");
const Watchlist = require("./models/watchlist");
const Wishlist = require("./models/wishlist");
const Review = require("./models/review");
const CuratedList = require("./models/curatedList");
const CuratedListItem = require("./models/curatedListItem");
const seedData = require("./seeder/seed");
const app = express();

// database call
connectDB();

// seed data
seedData();

app.use(express.json());

// routes
const searchMovieRoute = require('./routes/searchMovie');
const curatedListsRoute = require('./routes/curatedLists');
const curatedListUpdateRoute = require('./routes/curatedLists');


app.use('/api', searchMovieRoute);
app.use('/api', curatedListsRoute);
app.use('/api', curatedListUpdateRoute);




app.get("/", (req, res) => {
    res.send("Welcome to cinePaletteCinema.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on the port: " + PORT);
});