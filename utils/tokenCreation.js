require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const tokenConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const tokenSetup = (user) => {
    const token = jwt.sign({
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
    }, secret, tokenConfig);
    return token;
};

module.exports = tokenSetup;
