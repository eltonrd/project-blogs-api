module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
  { timestamps: false, tableName: 'PostCategories' });
  PostsCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
    models.BlogPosts.belongsToMany(models.BlogPosts, {
      as: 'relatedPosts',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
  };

    return PostsCategory;
  };