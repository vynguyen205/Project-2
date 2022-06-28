const sequelize = require('../config/connection');
const Word = require('../models/words');

//gets a random word after retrieving all the words
const getRandomWord = () => {
    return Word.findAll({})
    .then(words => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        return randomWord;
    })
    .catch(err => {
        console.log(err);
    }
    );
}

getRandomWord().then(word => { 
    console.log(word);
})