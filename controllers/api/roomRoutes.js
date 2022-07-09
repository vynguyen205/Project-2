const router = require('express').Router();
const { Room, User } = require('../../models');
const Word = require('../../models/words');
const randomAvatar = require('../../logic/randomAvatars');

//create room and create user
router.post(`/`, async (req, res) => {
  // console.log(`GRABBING FROM FRONT END:`, req.body);
  const { user_name, ...roomData } = req.body;
  try {
    //create room in db
    const createRoom = await Room.create(roomData);
    //create user in dB
    const createdUser = await User.create({
      username: user_name,
      room_id: createRoom.id,
      socket_id: req.body.socket_id,
      avatar: randomAvatar(),
    });

    if (res.status(200)) {
      res.json({
        room: createRoom,
        user: createdUser,
      });
    }

    //redirect to the room
    // res.redirect(`/api/rooms/${createRoom.room_name}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//update room
router.post(`/:roomName`, async (req, res) => {
  console.log(`UPDATING ROOM`, req.body);
  const { join_username, ...roomData } = req.body;
  try {
    const joinRoom = await Room.findOne({
      where: { room_name: req.params.roomName },
    });
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`, joinRoom);
    if (!joinRoom) {
      res.status(404).json({
        message: `Room ${req.params.roomName} not found`,
      });
    }
    const createJoinedUser = await User.create({
      username: join_username,
      room_id: joinRoom.id,
      socket_id: req.body.socket_id,
      avatar: randomAvatar(),
    });

    if (res.status(200)) {
      res.json({
        room: joinRoom,
        user: createJoinedUser,
      });
    }

    // res.redirect(`/rooms/${joinRoom.room_name}`);
  } catch (err) {
    res.status(500).json(err);
    console.log(`ERROR:`, err);
  }
});

//get all room information by the room name
router.get(`/:roomName`, async (req, res) => {
  try {
    const roomData = await Room.findOne({
      where: { roomName: req.params.roomName },
    });
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`);

    if (res.status(200)) {
      res.json(roomData);
      // res.render('game_room', { roomName: req.params.roomName });
    }
    //render the view game-room.handlebars
  } catch (err) {
    res.status(500).json(err);
    console.log(`ERROR:`, err);
  }
});

// /get all rooms
router.get('/', async (req, res) => {
  try {
    const roomData = await Room.findAll();
    res.status(200).json(roomData);
  } catch (err) {
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
