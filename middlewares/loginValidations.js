// Referência para uso da lib validator: https://www.npmjs.com/package/validator
// https://www.cssscript.com/best-javascript-form-validator/
const validator = require('validator');

const loginEmailValidation = (req, res, next) => {
    const { email } = req.body;

    if (typeof email === 'undefined') {
        return res.status(400).json({
            message: '"email" is required',
        });
    }
    if (validator.isEmpty(email)) {
        return res.status(400).json({
            message: '"email" is not allowed to be empty',
        });
    }
    next();
};

const loginPasswordValidation = (req, res, next) => {
    const { password } = req.body;

    if (typeof password === 'undefined') {
        return res.status(400).json({
            message: '"password" is required',
        });
    }
    if (validator.isEmpty(password)) {
        return res.status(400).json({
            message: '"password" is not allowed to be empty',
        });
    }
    next();
};

module.exports = {  
    loginEmailValidation,
    loginPasswordValidation,
};
