const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module
const fileUpload = require('express-fileupload')
const bcrypt = require('bcrypt') // imports bcrypt module

const app = express() // calls express function to start new Express app

const homeController = require('./controllers/home.js')
const newPostContoller = require('./controllers/newPost.js')
const getPostController = require('./controllers/getPost.js')
const storePostController = require('./controllers/storePost.js')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

const validateMiddleWare = require('./middleware/validationMiddleware.js')

mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true });

app.use(express.static('public')) // tells Express to use public folder for static files
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

app.listen(3000, () => { // tells Express to listen on port 4000 for HTTP requests
  console.log("App listening on port 3000")
})

app.get('/', homeController)
app.get('/posts/new', newPostContoller)
app.get('/post/:id', getPostController)
app.post('/posts/store', validateMiddleWare, storePostController)
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)

app.get('/about', (req, res) => { // called when request to /about comes in
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render('about');
})

app.get('/contact', (req, res) => { // called when request to /about comes in
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
  res.render('contact');
})
