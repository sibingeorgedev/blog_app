const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module

const app = express() // calls express function to start new Express app
const path = require('path') // imports path module
const BlogPost = require('./models/BlogPost.js')
mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true });

app.use(express.static('public')) // tells Express to use public folder for static files
app.use(express.json())
app.use(express.urlencoded())
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

app.listen(3000, () => { // tells Express to listen on port 4000 for HTTP requests
  console.log("App listening on port 3000")
})

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({})
  res.render('index', {
    blogposts
  });
})

app.get('/about', (req, res) => { // called when request to /about comes in
  // res.sendFile(path.resolve(__dirname, 'pages/about.html'))
  res.render('about');
})

app.get('/contact', (req, res) => { // called when request to /about comes in
  // res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
  res.render('contact');
})

app.get('/post', (req, res) => { // called when request to /about comes in
  // res.sendFile(path.resolve(__dirname, 'pages/post.html'))
  res.render('post');
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

// model creates a new doc with browser data
app.post('/posts/store', async (req, res) => {
  try {
    console.log(req.body);
    await BlogPost.create(req.body);
  }
  catch (error) {
    console.log(error);
  }
  res.redirect('/');
})
