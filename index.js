const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module
const fileUpload = require('express-fileupload')
const bcrypt = require('bcrypt') // imports bcrypt module
const expressSession = require('express-session'); // imports express-session module

const app = express() // calls express function to start new Express app

const authMiddleware = require('./middleware/authMiddleware')
const validateMiddleWare = require('./middleware/validationMiddleware.js')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

const homeController = require('./controllers/home.js')
const newPostContoller = require('./controllers/newPost.js')
const getPostController = require('./controllers/getPost.js')
const storePostController = require('./controllers/storePost.js')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true });

global.loggedIn = null;

app.use(express.static('public')) // tells Express to use public folder for static files
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.use(expressSession({
  secret: 'keyboard cat'
}))
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

app.listen(3000, () => { // tells Express to listen on port 4000 for HTTP requests
  console.log("App listening on port 3000")
})

app.get('/', homeController)
app.get('/posts/new', authMiddleware, newPostContoller)
app.get('/post/:id', getPostController)
app.post('/posts/store', validateMiddleWare, authMiddleware, storePostController)
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.get('/auth/logout', logoutController)
app.use((req, res) => res.render('notfound'));
