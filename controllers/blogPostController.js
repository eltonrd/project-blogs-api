const { BlogPosts, PostCategories } = require('../models');

const createBlogPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const userId = req.user.id;
        const blogPost = await BlogPosts.create({ 
            title, content, userId, published: new Date(), updated: new Date(), 
        });

        const createCategory = PostCategories.create(
            categoryIds.map((categoryId) => ({
                postId: blogPost.id,
                categoryId,
            })),
        );
        await Promise.all(createCategory);
        return res.status(201).json({ ...blogPost.dataValues });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createBlogPost,
};