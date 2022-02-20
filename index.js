const express = require('express');
const userController = require('./controllers/userController');
const {     
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('./middlewares/singUpValidations');
const {
  loginEmailValidation,
  loginPasswordValidation,
} = require('./middlewares/loginValidations');
const tokenVerification = require('./utils/tokenVerification');

const app = express();
app.use(express.json());
app.post('/user',
displayNameValidation,
passwordValidation,
emailValidation,
userController.signUp);
app.post('/login',
loginEmailValidation,
loginPasswordValidation,
userController.login);
app.get('/user',
tokenVerification,
userController.getAllUsers);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
