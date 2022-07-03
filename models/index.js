const Room = require('./room');
const Word = require('./words');
// const rounds = require('./rounds');
const User = require('./users');

//has many
// Room.hasMany(Word,{
//     foreignKey: 'word_id'
// })

//belongs to
User.belongsTo(Room, {
    foreignKey: 'room_id',
})

module.exports = {Room, Word, User}