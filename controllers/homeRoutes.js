const {Room, Word, User} = require('../models');
//These are all the view routes for your application
const router = require('express').Router();
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  console.log(`🧸 User is on home page`);
  res.render('home');
});

router.get(`/game_room/:roomid`, (req, res) => {
  //maybe we lookup record from db using roomid
  //
  console.log(`🧸 User is in lobby`);
  //this will render the view lobby.handlebars
  res.render('game_room', {roomid: req.params.roomid, numPlayers: 54});
});

//the host should create the room

router.post(`/game_room/create/`, async (req, res) => {
  console.log(req.body);
  const createRoom = await Room.create(req.body);
  console.log(createRoom);
  res.json(createRoom)
});

router.post(`/game_room/user`, async (req, res) => {
  const createRoom = await Room.create({});

});



module.exports = router;