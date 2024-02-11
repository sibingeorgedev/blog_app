const express = require('express') // imports express module
const ejs = require('ejs') // imports ejs module
const mongoose = require('mongoose') // imports mongoose module
const fileUpload = require('express-fileupload')

const app = express() // calls express function to start new Express app
const path = require('path') // imports path module
const BlogPost = require('./models/BlogPost.js')
mongoose.connect('mongodb+srv://sibingeorge009:MaryGeorge256@sibincluster.ptohacb.mongodb.net/', { useNewUrlParser: true });

app.use(express.static('public')) // tells Express to use public folder for static files
app.use(express.json())
app.use(express.urlencoded())
app.use(fileUpload())
app.set('view engine', 'ejs') // tells Express to use EJS as its view engine

const validateMiddleWare = (req, res, next) => { // middleware function
  if (req.files == null || req.body.title == null) { // if no image or title
    return res.redirect('/posts/new') // redirect to /posts/new
  }
  next() // if there is an image and title, call next() to move on to the next function
}

app.listen(3000, () => { // tells Express to listen on port 4000 for HTTP requests
  console.log("App listening on port 3000")
})

app.get('/', async (req, res) => {
  const blogposts = await BlogPost.find({}) // returns all documents in the BlogPost collection
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

app.get('/post/:id', async (req, res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post', {
    blogpost
  })
})

app.get('/posts/new', (req, res) => {
  res.render('create')
})

// model creates a new doc with browser data
app.post('/posts/store', validateMiddleWare, async (req, res) => {
  try {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
      await BlogPost.create({ ...req.body, image: '/img/' + image.name })
      res.redirect('/')
    });
  } catch (error) {
    console.log(error);
  }
});
