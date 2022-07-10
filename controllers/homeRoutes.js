const { Room, Word, User } = require('../models');
// const chalk = require('chalk');
//These are all the view routes for your application
const router = require('express').Router();
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  // console.log(chalk.yellow(`🧸 User is on home page`));
  res.render('home');
});

router.get('/game/room_name/:roomName', async (req, res) => {
  try {
    const roomData = await Room.findByPk(req.params.roomName);
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`);

    // res.json(roomData);
    res.render('game_room', { roomName: req.params.roomName });

    //render the view game-room.handlebars
  } catch (err) {
    res.status(500).json(err);
    console.log(`ERROR:`, err);
  }
});

module.exports = router;
