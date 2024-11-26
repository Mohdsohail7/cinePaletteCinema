const { sequelize, DataTypes } = require('../config/database');

const CuratedListItem = sequelize.define('CuratedListItem', {
    curatedListId: {
      type: DataTypes.INTEGER,
      references: { model: 'CuratedLists', key: 'id' }
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: { model: 'Movies', key: 'id' } 
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
  module.exports = CuratedListItem;