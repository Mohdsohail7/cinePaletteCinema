module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      movieId: {
        type: DataTypes.INTEGER,
        references: { model: 'movie', key: 'id' },
      },
      rating: {
        type: DataTypes.FLOAT,
      },
      reviewText: {
        type: DataTypes.STRING,
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
  Review.associate = (models) => {
    Review.belongsTo(models.Movie, { foreignKey: 'movieId' });
  };

  return Review;
};