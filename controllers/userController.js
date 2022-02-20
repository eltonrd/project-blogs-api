const { User } = require('../models');
const tokenSetup = require('../utils/tokenCreation');

const login = async (req, res) => {
    try {
        const { displayName, email, password, image } = req.body;
        const findUser = await User.findOne({ where: { email } });
        if (findUser) { return res.status(409).json({ message: 'User already registered' }); }
        const newUser = await User.create({
            displayName,
            email,
            password,
            image,
        });
        const userToken = tokenSetup(newUser);
        return res.status(201).json({ userToken });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    login,
};
