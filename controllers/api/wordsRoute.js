const router = require('express').Router();
const Words = require('../../models/words');

// Get route for retrieving words
router.get('/', async (req, res) => {
  const wordsData = await Words.findAll();
  console.log('wordsData', wordsData);
  return res.json(wordsData);
});
//CREATE word
router.post('/', async (req, res) => {
  const wordsData = await Words.create(req.params.words);
  return res.json(wordsData);
});

router.get('/:id', async (req, res) => {
  const wordsData = await Words.findByPk(req.params.id);
  return res.json(wordsData);
});

router.get('/:word', async (req, res) => {
  const wordsData = await Words.findByPk(req.params.word);
  return res.json(wordsData);
});

router.get('/:points', async (req, res) => {
  const wordsData = await Words.findByPk(req.params.points);
  return res.json(wordsData);
});


module.exports = router;
