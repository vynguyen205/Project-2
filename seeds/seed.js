const sequelize = require('../config/connection');
const chalk = require('chalk');
const Word = require('../models/words');
const words = require("./words.json")

const seedWords = async () => {
    try {
        sequelize.sync({ force: true }).then(async() => {
            console.log(chalk.greenBright('🤝 Nice! Database is synced 🤝'));
            await Word.bulkCreate(words);
            console.log(chalk.greenBright('🗄 Nice! Words are added 🗄'));
        });
    } catch (err) {
        console.log(chalk.redBright('🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨'), err);
    }
}
seedWords();