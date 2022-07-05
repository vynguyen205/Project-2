const User = require ('../../models/users');
const users = [];

// join user to chat 
const userJoin = (id, username, room_name, socket_id) => {
    const user = new User(id, username, room_name, socket_id);
    users.push ('user');
    return user;
}

//get current user 
const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
    }

module.exports = {userJoin, getCurrentUser};