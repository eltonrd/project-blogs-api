const { User } = require('../models');
const tokenSetup = require('../utils/tokenCreation');

const signUp = async (req, res) => {
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ where: { email } });
        if (!findUser) { return res.status(400).json({ message: 'Invalid fields' }); }
        const token = tokenSetup({ email, password });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ where: { id } });
        if (!user) { return res.status(404).json({ message: 'User does not exist' }); }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

module.exports = {
    signUp,
    login,
    getAllUsers,
    getUserById,
};
