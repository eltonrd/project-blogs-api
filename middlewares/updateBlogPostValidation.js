const { BlogPosts } = require('../models');

const updateBlogPostValidation = async (req, res, next) => {
    console.log(req.user);
    const { title, content, categoryIds } = req.body;
    const { id } = req.params;
    const post = await BlogPosts.findOne({ where: { id } });
    if (!title) {
        return res.status(400).json({ message: '"title" is required' });
    }
    if (!content) {
        return res.status(400).json({ message: '"content" is required' });
    }
    if (categoryIds) {
        return res.status(400).json({ message: 'Categories cannot be edited' });
    }
    if (post.userId !== req.user.id) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    next();
};

module.exports = { updateBlogPostValidation };
