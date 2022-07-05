const User = require ('../../models/users');
const users = [];

// join user to chat 
const userJoin = (userid, room_name, socketid) => {
    const user = User.create({
        username: userid,
        room_id: room_name,
        socket_id: socketid,
      })
    users.push (user);
    return user;
}

//get current user 
const getCurrentUser = (id) => {

    return User.findOne({where:{socket_id:id}});
    }

module.exports = {userJoin, getCurrentUser};