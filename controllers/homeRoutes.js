//These are all the view routes for your application
const router = require('express').Router();

//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  console.log(`🧑🏼‍💻 User is on home page`);
  res.render('home');
});

router.get('/lobby', (req, res) => {
  console.log(`🕺🏼 User is in lobby`);
  //this will render the view lobby.handlebars
  res.render('lobby');
});

router.get('/game_room', (req, res) => {
  console.log(`🎮 User is in game room`);
  //this will render the view game_room.handlebars
  res.render('game_room');
})



module.exports = router;