const User = require('../models/users');

// join user to chat
const userJoin = async (userid, room_name, socketid) => {
  const user = await User.create({
    username: userid,
    room_id: room_name,
    socket_id: socketid,
  });
  return user;
};

//get current user
const getCurrentUser = (id) => {
  return User.findOne({ where: { socket_id: id } });
};

module.exports = { userJoin, getCurrentUser };