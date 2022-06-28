const router = require('express').Router();

const apiRoutes = require('./api/apiRoutes');
const homeRoutes = require('./homeRoutes');
const wordsRoutes = require('./api/wordsRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', wordsRoutes); 

module.exports = router;