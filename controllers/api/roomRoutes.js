const router = require('express').Router();
const { Room, User } = require('../../models');
const Word = require('../../models/words');

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
        const roomData = await Room.findOne(req.params.id,{
        });
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`);

    // if (!roomData) {
    //   res.status(404).json({ message: 'Room not found' });
    //   return;
      // }
    //render the view game-room.handlebars
    res.status(200).render('game_room', {roomName: req.params.roomName});

  } catch (err) {
        res.status(500).json(err);
    }
  });
  //create room
  router.post(`/`, async (req, res) => {
    try {
    const createRoom = await Room.create({
      room_name: req.body.room_name,
      password: req.body.password,
    },
    {
      include: [{model: User}],
      attribute: ['room_name', 'password']
    })
    res.status(200).json(createRoom);
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
  //DELETE room
  router.delete('/:roomid', async (req, res) => {
    try {
      const roomData = await Room.destroy({
        where: {
          id: req.params.id
        }
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