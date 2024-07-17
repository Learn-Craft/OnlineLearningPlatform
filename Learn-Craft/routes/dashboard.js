const express = require('express');
const router = express.Router();

// Ensure user is logged in
router.get('/', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login.ejs');
  }
  res.render('dashboard', { user: req.session.user });
});

module.exports = router;
