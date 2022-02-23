const { Op } = require('sequelize');
const { BlogPosts, PostCategory, User, Category } = require('../models');

const errorMessage = 'Internal server error';

const createBlogPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const blogPost = await BlogPosts.create({
            title,
            content,
            userId: req.user.id,
            published: new Date(),
            updated: new Date(),
        });
        // Referência para o método bulkCreate() do model PostCategory: https://sebhastian.com/sequelize-bulk-create/#:~:text=When%20you%20need%20to%20insert,with%20a%20single%20function%20call.
        await PostCategory.bulkCreate({ blogPostId: blogPost.id, categoryId: categoryIds });
        res.status(201).json(blogPost);
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
        const findPost = await BlogPosts.findOne({ where: { id } });
        // Necessário realizar a verificação para evitar que o usuário exclua um post que não é dele no controller.
        if (!findPost) {
            return res.status(404).json({ message: 'Post does not exist' });
        }
        if (findPost.userId !== req.user.id) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }
        await BlogPosts.destroy({ where: { id } });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.destroy({ where: { id: req.user.id } });
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: errorMessage });
    }
};

// Referência para o uso do operador Op: https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize
const searchByQuery = async (query) => {
    const search = query.toLowerCase();
    const posts = await BlogPosts.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${search}%` } },
                { content: { [Op.like]: `%${search}%` } },
            ],
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return posts;
};
const searchBlogPosts = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        const queryPosts = await BlogPosts.findAll({
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
            });
        return res.status(200).json(queryPosts);
    }
    const posts = await searchByQuery(q);
    if (!posts) {
        return res.status(200).json([]);
    }
    return res.status(200).json(posts);
};

module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost,
    deleteUser,
    searchBlogPosts,
};