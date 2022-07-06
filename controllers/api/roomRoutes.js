const router = require('express').Router();
const { Room, User } = require('../../models');
const Word = require('../../models/words');
const randomAvatar = require('../../logic/randomAvatars');

//get all rooms
router.get('/', async (req, res) => {
  try {
    const roomData = await Room.findAll();
    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one room
router.get(`/:roomName`, async (req, res) => {
  try {
    const roomData = await Room.findOne(req.params.id, {});
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`);

    // if (!roomData) {
    //   res.status(404).json({ message: 'Room not found' });
    //   return;
    // }
    //render the view game-room.handlebars
    res.status(200).render('game_room', { roomName: req.params.roomName });
  } catch (err) {
    res.status(500).json(err);
  }
});

//joining a room
// router.post('/', async (req, res) => {

//create room and create user
router.post(`/`, async (req, res) => {
  console.log(req.body);
  const { user_name, ...roomData } = req.body;
  try {
    //creat e room in db
    const createRoom = await Room.create(roomData);
    //create user in db
    const createdUser = await User.create({
      username: user_name,
      room_id: createRoom.id,
      avatar: randomAvatar(),
    });

    if (res.json(createdUser) || res.json(createRoom)) {
      res.status(200);
    }

    console.log('!!!!!', createdUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//DELETE room
router.delete('/:roomid', async (req, res) => {
  try {
    const roomData = await Room.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!roomData) {
      res.status(404).json({ message: 'No room found with this id!' });
      return;
    }

    res.status(200).json(roomData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
