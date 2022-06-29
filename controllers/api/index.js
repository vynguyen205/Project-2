const router = require('express').Router();
const wordsRoute = require('./wordsRoute');
// const userRoutes = require('./userRoutes');
const { route } = require('./wordsRoute');
// const gameRoomRoute = require('./gameRoomRoute');
// const lobbyRoute = require('./lobby');

router.use('/words', wordsRoute);
// router.use('/users', userRoutes);
// router.use('/gameRoomRoute', gameRoomRoute);
// router.use('/lobbyRoute',lobbyRoute);

module.exports = router;