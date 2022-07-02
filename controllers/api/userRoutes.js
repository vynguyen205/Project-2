const router = require('express').Router();
const User = require('../../models/users');

// Get route for retrieving users
router.get('/', async (req, res) => {
  const userData = await User.findByPk;
  console.log('userData', userData);
  return res.json(userData);
});

router.post('/', async (req, res) => {
  const userData = await User.create(req.params.user);
  return res.json(userData);
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

// Create user from user data that was pulled from users model 
router.post('/', async (req, res) => {
  const userData = await User.create(req.body);
  return res.json(userData);
});

module.exports = router;
