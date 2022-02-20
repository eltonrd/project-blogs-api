const { Category } = require('../models');

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: '"name" is required' });
        }
        const category = await Category.create({ name });
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
};
