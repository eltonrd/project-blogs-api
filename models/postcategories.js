module.exports = (sequelize, _DataTypes) => {
  const PostCategories = sequelize.define('PostCategories', {},
  { timestamps: false, tableName: 'PostCategories' });
  PostCategories.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
        through: PostCategories,
        foreignKey: 'categoryId',
        otherKey: 'postId',
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
        through: PostCategories,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
  };

    return PostCategories;
  };