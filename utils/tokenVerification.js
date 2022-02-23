require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const tokenVerification = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const findUser = await User.findOne({
            where: { email: decoded.email },
        });
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = findUser;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = tokenVerification;