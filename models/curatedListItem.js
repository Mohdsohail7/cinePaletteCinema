module.exports = (sequelize, DataTypes) => {
  const CuratedListItem = sequelize.define(
    'CuratedListItem',
    {
      curatedListId: {
        type: DataTypes.INTEGER,
        references: { model: 'curatedList', key: 'id' },
      },
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
  CuratedListItem.associate = (models) => {
    CuratedListItem.belongsTo(models.CuratedList, { foreignKey: 'curatedListId' });
    CuratedListItem.belongsTo(models.Movie, { foreignKey: 'movieId' });
  };

  return CuratedListItem;
};