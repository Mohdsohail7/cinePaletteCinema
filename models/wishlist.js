module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    'Wishlist',
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
  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.Movie, { foreignKey: 'movieId' });
  };

  return Wishlist;
};