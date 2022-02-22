module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', {},
  { timestamps: false, tableName: 'PostCategories' });
  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.BlogPost, {
      as: 'relatedPosts',
        through: PostsCategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
    });
  };

    return PostsCategory;
  };