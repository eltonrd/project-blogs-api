const { Category } = require('../models');

const getPostByIdValidation = async (req, res, next) => {
    const { id } = req.params;
    const post = await Category.findByPk(id);
    if (!post) {
        return res.status(404).json({ message: 'Post does not exist' });
    }
    next();
};

module.exports = { getPostByIdValidation };