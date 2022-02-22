module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {},
  { timestamps: false, tableName: 'PostsCategories' });
  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Category, {
      as: 'categories',
        through: PostCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPosts, {
      as: 'relatedPosts',
        through: PostCategory,
        foreignKey: 'categoryId',
        otherKey: 'postId',
    });
  };

    return PostCategory;
  };