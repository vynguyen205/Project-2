const { Room, Word, User } = require('../models');
//These are all the view routes for your application
const router = require('express').Router();
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  console.log(`!!!!User is on home page!!!`);
  res.render('home');
});

module.exports = router;
