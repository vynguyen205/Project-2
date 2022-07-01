const router = require('express').Router();
const wordsRoute = require('./wordsRoute');
const userRoutes = require('./userRoutes');
const gameRoomRoute = require('../homeRoutes');
const lobbyRoute = require('../homeRoutes');

router.use('/words', wordsRoute);
router.use('/users', userRoutes);
router.use('/gameRoom', gameRoomRoute);
router.use('/lobby',lobbyRoute);

module.exports = router;