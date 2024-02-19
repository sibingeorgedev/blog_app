const User = require('../models/User.js')
const path = require('path')

module.exports = async (req, res) => {
    console.log(req.body)
    try {
        await User.create(req.body)
        res.redirect('/')
    }

    catch (error) {
        return res.redirect('/auth/register')
    }
}
