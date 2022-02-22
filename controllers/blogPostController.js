const { BlogPosts, PostCategory } = require('../models');

const createBlogPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const userId = req.user.id;
        const blogPost = await BlogPosts.create({ title, content, userId });
        const blogPostId = blogPost.id;
        await PostCategory.Create(
            categoryIds.map((categoryId) => ({
                categoryId,
                postId: blogPostId,
            })),
        );
        return res.status(201).json(blogPost);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createBlogPost,
};