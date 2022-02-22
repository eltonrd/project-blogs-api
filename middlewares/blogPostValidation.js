const { Category } = require('../models');

const blogPostValidation = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;

    if (!title) { return res.status(400).json({ message: '"title" is required' }); }
    if (!content) { return res.status(400).json({ message: '"content" is required' }); }
    if (!categoryIds) { return res.status(400).json({ message: '"categoryIds" is required' }); }
    const findAllCategories = await Category.findAll();
    const categories = findAllCategories.map((category) => category.id);
    const categoryIdsIsValid = categoryIds.every((id) => categories.includes(id));
    if (!categoryIdsIsValid) {
 return res.status(400).json({ 
        message: '"categoryIds" not found' }); 
}
    next();
};

module.exports = { blogPostValidation };