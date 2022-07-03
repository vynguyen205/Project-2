const router = require('express').Router();
const User = require('../../models/users');

// Get route for retrieving users
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll();
      console.log('userData', userData);
      res.status(200).json(userData);
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

// Create user from user data that was pulled from users model 
router.post('/', async (req, res) => {
  try{
    const userData = await User.create(req.body);
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
        id: req.params.id
      }
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
