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
router.get(`/:roomid`, async (req, res) => {
    try {
        const roomData = await Room.findOne(req.params.id,{
        });
        //this will render the view lobby.handlebars
    res.render('game_room', {roomid: req.params.roomid, numOfPlayers: 54});
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
    console.log(createRoom);
    res.redirect(`rooms/${createRoom.id}`);
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