const { sequelize, DataTypes } = require('../config/database');

const Watchlist = sequelize.define('Watchlist', {
    movieId: {
      type: DataTypes.INTEGER,
      references: { model: 'Movies', key: 'id' }
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
  module.exports = Watchlist;