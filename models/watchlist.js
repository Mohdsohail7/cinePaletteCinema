module.exports = (sequelize, DataTypes) => {
  const Watchlist = sequelize.define(
    'Watchlist',
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: 'movie', key: 'id' },
      },
      addedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: true,
    }
  );

  // Associations
  Watchlist.associate = (models) => {
    Watchlist.belongsTo(models.Movie, { foreignKey: 'movieId' });
  };

  return Watchlist;
};