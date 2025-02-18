const { Movie, Watchlist, Wishlist, Review, CuratedList, CuratedListItem } = require("../models");
const { sequelize } = require("../config/database");
const moviesData = require("../data");


async function seedData() {
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
        const curatedListItems = await CuratedListItem.bulkCreate([
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

        console.log("Data Saved in Database.")
        
    } catch (error) {
        console.error('Error sending from database', error.message);
    }
}
module.exports = seedData;