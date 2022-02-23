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
const {
  getPostByIdValidation,
} = require('./middlewares/getPostByIdValidation');
const {
  updateBlogPostValidation,
} = require('./middlewares/updateBlogPostValidation');
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
tokenVerification,
blogPostValidation,
blogPostController.createBlogPost);
app.get('/post',
tokenVerification,
blogPostController.getAllBlogPosts);
app.get('/post/search',
tokenVerification,
blogPostController.searchBlogPosts);
app.get('/post/:id',
tokenVerification,
getPostByIdValidation,
blogPostController.getBlogPostById);
app.put('/post/:id',
tokenVerification,
updateBlogPostValidation,
blogPostController.updateBlogPost);
app.delete('/post/:id',
tokenVerification,
blogPostController.deleteBlogPost);
app.delete('/user/me',
tokenVerification,
blogPostController.deleteUser);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
