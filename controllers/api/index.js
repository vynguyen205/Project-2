const router = require('express').Router();
const wordsRoute = require('./wordsRoute');

router.use('/words', wordsRoute);

module.exports = router;