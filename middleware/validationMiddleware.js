module.exports = (req, res, next) => {
    if (req.body.title == '') {
        return res.redirect('/posts/new') // redirect to /posts/new
    }
    next() //
}

// const validateMiddleWare = (req, res, next) => { // middleware function
//     if (req.files == null || req.body.title == null) { // if no image or title
//         return res.redirect('/posts/new') // redirect to /posts/new
//     }
//     next() // if there is an image and title, call next() to move on to the next function
// }