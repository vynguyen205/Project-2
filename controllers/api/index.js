const router = require('express').Router();
const wordsRoute = require('./wordsRoute');
const userRoutes = require('./userRoutes');
const roomRoutes = require('./roomRoutes');

router.use('/words', wordsRoute);
router.use('/users', userRoutes);
router.use('/rooms', roomRoutes);

module.exports = router;