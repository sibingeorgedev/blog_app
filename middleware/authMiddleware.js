const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      return res.redirect('/');
    }
    next();
  } catch (error) {
    // Handle any errors that occur during the async operations
    console.error('Error in middleware:', error);
    res.redirect('/');
  }
};
