const { sequelize, DataTypes } = require('../config/database');

const Review = sequelize.define('Review', {
    movieId: {
      type: DataTypes.INTEGER,
      references: { model: 'Movies', key: 'id' }
    },
    rating: DataTypes.FLOAT, // User rating
    reviewText: DataTypes.STRING, // User review
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
  module.exports = Review;