const sequelize = require('../config/connection');
const Word = require('../models/words');
const words = require("./words.json")

const seedWords = async () => {
sequelize.sync({ force: true }).then(async() => {
    console.log('🤝 Nice! Database is synced 🤝');
    await Word.bulkCreate(words);
    console.log('🗄 Nice! Words are added 🗄');
})
}
seedWords();