const router = require('express').Router();
const wordsRoute = require('./wordsRoute');
const userRoutes = require('./userRoutes');

router.use('/words', wordsRoute);
router.use('/users', userRoutes);

module.exports = router;