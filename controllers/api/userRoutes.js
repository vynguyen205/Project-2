const router = require('express').Router();
const { User, Room } = require('../../models');

// Get route for retrieving users inside of a room
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll();

    // console.log('userData', userData);
    res.status(200).json(userData);
    // const room = await Room.findOne({
    // include: [{model: Room}],
    // attributes: ['id', 'socket_id', 'username', 'avatar', 'highscore'],
    // where: {id: req.body.room_id}
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get data from users model (id, socket_id, username, highscore, avatar, room_id)
router.get('/:id', async (req, res) => {
  const userData = await User.findByPk(req.params.id);
  return res.json(userData);
});

router.get('/:socket_id', async (req, res) => {
  const userData = await User.findByPk(req.params.socket_id);
  return res.json(userData);
});

router.get('/:username', async (req, res) => {
  const userData = await User.findByPk(req.params.username);
  return res.json(userData);
});

router.get('/:highscore', async (req, res) => {
  const userData = await User.findByPk(req.params.highscore);
  return res.json(userData);
});

router.get('/:avatar', async (req, res) => {
  const userData = await User.findByPk(req.params.avatar);
  return res.json(userData);
});

router.get('/:room_id', async (req, res) => {
  const userData = await User.findByPk(req.params.room_id);
  return res.json(userData);
});

// Create user from inside of a room

router.post('/', async (req, res) => {
  try {
    // const roomData = await Room.findOne({
    //   // include: [{model: User}],
    //   // where: {id: req.body.room_id}
    // })

    // if (!roomData) {
    //   res.status(404).json({ message: 'Room not found' });
    //   return;
    // }

    const userData = await User.create(req.body);
    // {
    //   username: req.body.username,
    //   socket_id: req.body.socket_id,
    // },
    // {
    //   include: [{model: Room}],
    //   attributes: ['id', 'socket_id', 'username', 'avatar', 'highscore'],
    // }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const userData = await userData.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
