const { BlogPosts, PostCategories, User, Category } = require('../models');

const errorMessage = 'Internal server error';

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
        return res.status(500).json({ message: errorMessage });
    }
};

const getAllBlogPosts = async (req, res) => {
    try {
// Referência para o método findAll() do model BlogPosts: https://stackoverflow.com/questions/42661141/findall-include-more-tables-on-sequelize-query
        const allPosts = await BlogPosts.findAll({ 
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } }, 
            ],
        });
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

const getBlogPostById = async (req, res) => {
    try { 
        const { id } = req.params;
        const post = await BlogPosts.findOne({ 
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
            where: { id },
        });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

const updateBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await BlogPosts.update({ title, content }, { where: { id } });
        const post = await BlogPosts.findOne({ 
            include: [
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
            where: { id },
        });
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const { id } = req.params;
        await BlogPosts.destroy({ where: { id } });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
};