const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}) // returns all documents in the BlogPost collection
    res.render('index', { blogposts });
    console.log(req.path)
}

// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', { blogposts });
// })