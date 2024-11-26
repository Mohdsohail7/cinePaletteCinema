const { sequelize, DataTypes } = require('../config/database');

const CuratedList = sequelize.define('CuratedList', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING, // For public access
    description: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  
  module.exports = CuratedList;
  