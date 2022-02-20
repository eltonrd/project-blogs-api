// Referência do regex https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
const regexEmail = (email) => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    return regex.test(email);
};

const displayNameValidation = (req, res, next) => {
    const { displayName } = req.body;
    try {
        if (displayName.length < 8) {
            throw new Error('error');
        }
    } catch (error) {
        return res.status(400).json({
            message: '"displayName" length must be at least 8 characters long',
        });
    }
    next();
};

const emailValidation = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            message: '"email" is required',
        });
    }
    if (!regexEmail(email)) {
        return res.status(400).json({
            message: '"email" must be a valid email',
        });
    }
    next();
};

const passwordValidation = (req, res, next) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            message: '"password" is required',
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: '"password" length must be 6 characters long',
        });
    }
    next();
};

module.exports = {
    displayNameValidation,
    emailValidation,
    passwordValidation,
};
