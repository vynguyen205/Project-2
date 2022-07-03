const router = require('express').Router();
const Room = require('../../models/room');
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
        // req.render('game_room', {room_id: roomData.room_id});  
      //this will render the view game-room.handlebars
    //maybe we lookup record from db using roomid
    console.log(`🧸 User is in game room`);

    if (!roomData) {
        res.status(404).json({ message: 'Room not found' });
        return;
    }
      res.status(200).json(roomData);
  } catch (err) {
        res.status(500).json(err);
    }
  });
  
  //create room
  router.post(`/`, async (req, res) => {
    try {
    const createRoom = await Room.create(req.body);
    res.status(200).json(createRoom);
    // res.render('game_room', {roomName: req.body.roomName});
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