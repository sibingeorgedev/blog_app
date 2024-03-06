const BlogPost = require('../models/BlogPost.js')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}) // returns all documents in the BlogPost collection
    console.log(req.session);
    res.render('index', { blogposts });
}

// app.get('/', async (req, res) => {
//     const blogposts = await BlogPost.find({})
//     res.render('index', { blogposts });
// })