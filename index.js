const express = require('express');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');
const {     
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('./middlewares/singUpValidations');
const {
  loginEmailValidation,
  loginPasswordValidation,
} = require('./middlewares/loginValidations');
const {
  blogPostValidation,
} = require('./middlewares/blogPostValidation');
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
app.get('/user/:id',
tokenVerification,
userController.getUserById);
app.post('/categories',
tokenVerification,
categoryController.createCategory);
app.get('/categories',
tokenVerification,
categoryController.getAllCategories);
app.post('/post',
blogPostValidation,
blogPostController.createBlogPost);
app.get('/post',
tokenVerification,
blogPostController.getAllBlogPosts);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
