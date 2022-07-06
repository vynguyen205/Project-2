const User = require('../models/users');
const socket = require('socket.io');
// const initSocket = require('../websocket/index');

// const userSocket = async (io) => {
//   io.on = promisify(io.on);
//   // try {
//   //   io.on('connection', (getSock) => {
//   //     return getSock.id;
//   //   });
//   // } catch (err) {
//   //   console.log(
//   //     chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err))
//   //   );
//   // }
// };

// console.log(`!!!!!!!!!!!`, userSocket);

// join user to chat
// const userJoin = async (user_name, room_id) => {
//   const user = await User.create({
//     username: user_name,
//     room_id,
//     // socket_id:
//   });
//   return user;
// };

//get current user
// const getCurrentUser = (id) => {
//   return User.findOne({ where: { socket_id: id } });
// };

module.exports = { userJoin, getCurrentUser };
