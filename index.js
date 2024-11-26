const express = require("express");
const { sequelize } = require("./config/database");
const Movie = require("./models/movie");
const moviesData = require("./data");
const Watchlist = require("./models/watchlist");
const Wishlist = require("./models/wishlist");
const Review = require("./models/review");
const CuratedList = require("./models/curatedList");
const app = express();

app.use(express.json());

app.get('/seed_db', async (req, res) => {
    try {
        await sequelize.sync({ force: true });
        // movies data seeded
        await Movie.bulkCreate(moviesData);
        // Watchlist
        const watchlist = await Watchlist.bulkCreate([
            { movieId: moviesData[0].id, addedAt: new Date() },
            { movieId: moviesData[1].id, addedAt: new Date() },
        ]);
        // Wishlist
        const wishlist = await Wishlist.bulkCreate([
            { movieId: moviesData[2].id, addedAt: new Date() },
        ]);
        // Reviews
        const reviews = await Review.bulkCreate([
            {
                movieId: moviesData[0].id,
                rating: 9.0,
                reviewText: 'Amazing concept and execution.',
                addedAt: new Date(),
              },
              {
                movieId: moviesData[1].id,
                rating: 10.0,
                reviewText: 'One of the best superhero movies ever.',
                addedAt: new Date(),
              },
        ]);
        // Curated Lists
        const curatedLists = await CuratedList.bulkCreate([
            {
                name: 'Sci-Fi Masterpieces',
                slug: 'sci-fi-masterpieces',
                description: 'Top sci-fi movies to blow your mind.',
              },
              {
                name: 'Action Hits',
                slug: 'action-hits',
                description: 'The best action movies of the decade.',
              },
        ]);
        // Curated List Items
        const curatedListItems = await curatedListItems.bulkCreate([
            {
                curatedListId: curatedLists[0].id,
                movieId: moviesData[0].id,
                addedAt: new Date(),
              },
              {
                curatedListId: curatedLists[0].id,
                movieId: moviesData[2].id,
                addedAt: new Date(),
              },
              {
                curatedListId: curatedLists[1].id,
                movieId: moviesData[1].id,
                addedAt: new Date(),
              },
        ]);
        
    } catch (error) {
        console.log('Error sending from database', error.message);
    }
})
app.get("/", (req, res) => {
    res.send("Welcome to cinePaletteCinema.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on the port: " + PORT);
});