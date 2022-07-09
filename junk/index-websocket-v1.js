// const socket = require('socket.io');
// const chalk = require('chalk');
const { promisify } = require('util');
const { User } = require('../models');

const users = [];

const createWSEvents = async (io) => {
  io.on = promisify(io.on);
  try {
    io.on('connection', (socket) => {
      // console.log(chalk.green(`Client Connected`, socket.id));

      socket.on('createRoom', ({ room_name }) => {
        //check to see if someone already made a room with the same id
        if (room_name === room_name) {
          // console.log(chalk.red('Room already exists'));
          socket.emit('Room Exists: ', room_name);
        } //if not, create a new room
        else {
          // console.log(chalk.yellow('Creating Room: ', room_name));
        }
        //broadcasting the room to all users. letting them know that a new room has been created

        //if someone already made a room with the same id, tell them to pick a different name
      });
      // setting up event for when user joins room
      socket.on('Join Room', ({ roomName }) => {
        socket.join(roomName);
        //update the room with the new user
        socket.on('💃🏻 Join Server', () => {
          //   console.log(socket.id, 'socket id')
          // console.log("payload", user)
          //adding the new user to the array of users connected to the server
          // User.create({
          //     ...user,
          //     socket_id: socket.id
          // })
          //broadcasting the user to all other users. letting them know that a new user has joined
          socket.broadcast.emit('New User: ', users);

          //broadcasting the user to all other users. letting them know that a new user has joined
          socket
            .to(roomName)
            //you can also chain the to method to broadcast to multiple rooms
            // .to("another room")
            .emit('New User: ', users);
        });

        socket.on(
          'Send Message',
          ({ content, to, sender, chatName, isChannel }) => {
            //isChannel = public channel --- is not a channel = private message (DM)
            if (isChannel) {
              const payload = {
                content,
                sender,
                chatName,
              };
              //broadcasting the message to all users in the room
              // this "to" is the room name
              socket.to(to).emit('New Message', payload);
            } else {
              //private message
              const payload = {
                content,
                sender,
                // this is saying the name of the chat is the name of the user that is sending the message
                chatName: sender,
              };
              //broadcasting the message to the user that sent the message
              // this "to" is the user id
              socket.to(to).emit('New Message', payload);
            }
            // dig in to the message object and make sure the it exists in this chat room
            if (messages[chatName]) {
              messages[chatName].push({
                content,
                sender,
              });
            }
          }
        );
      });
      socket.on('Disconnect', () => {
        //removing the user from the array of users connected to the server
        users = users.filter((user) => user.id !== socket.id);
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('New User', users);
      });
    });
  } catch (err) {
    console.log(err);
    // chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err))
  }
};
const initSocket = (server) => {
  const io = socket(server);
  createWSEvents(io);
};

module.exports = initSocket;
