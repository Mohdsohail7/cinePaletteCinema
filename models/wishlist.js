const { sequelize, DataTypes } = require('../config/database');

const Wishlist = sequelize.define('Wishlist', {
    movieId: {
      type: DataTypes.INTEGER,
      references: { model: 'Movies', key: 'id' }
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
  module.exports = Wishlist;