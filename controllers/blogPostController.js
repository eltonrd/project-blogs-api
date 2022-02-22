const { BlogPosts, PostCategories } = require('../models');

const createBlogPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const { user } = req;
        const blogPost = await BlogPosts.create({
            title,
            content,
            userId: user.id,
        });
        const createCategoryMap = categoryIds.map(async (categoryId) => {
            await PostCategories.create({
                blogPostId: blogPost.id,
                categoryId });
        });
        await Promise.all(createCategoryMap);
        return res.status(201).json(blogPost);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports = {
    createBlogPost,
};