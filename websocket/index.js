const socket = require('socket.io');
const formatMessage = require('../logic/message');
const chalk = require('chalk');
const { promisify } = require('util');
const { User, Room } = require('../models');
// const { getCurrentUser } = require('../logic/user');

//past messages that were stored in the database
const messages = {
  general: [],
  random: [],
  jokes: [],
  javascript: [],
};
const bot = 'DÜDLE Bot';
const users = {};

let username = '';

const createWSEvents = async (io) => {
  io.on = promisify(io.on);
  try {
    //this runs when the user connects to the server
    io.on('connection', (socket) => {
      console.log(chalk.green('CONNECTED TO SOCKET!!! SOCKET ID:', socket.id));
      socket.emit('message', formatMessage(bot, `Welcome to DÜDL!`));

      socket.on('joinRoom', ({ room_name, join_username }) => {
        console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!`, room_name, join_username);
        // const newUser = userJoin(username, room, socket.id )
        username = join_username;
        socket.join(room_name); // needs a unique identifier for the rooom

        //broadcast to all users except for the actual user that joined that a new user has joined
        socket.broadcast
          .to(room_name)
          .emit('message', formatMessage(bot, `A user has joined the chat!`));
      });

      //this runs when the user sends a message
      socket.on('Chat Message', async (message) => {
        // console.log(chalk.blue(`Message Received: ${message}`));
        // const user = await User.findOne({ where: { username: username } });

        // console.log(`!!!!!!!!!!!!!!!!!!!!!!`, username);

        // socket.broadcast.emit('message', formatMessage('USER', message));
        console.log(chalk.blue(`Message Received: ${message.txt}`));
        const user = await User.finaAll({ where: { socket_id: socket.id } });

        console.log(`!!!!!!!`, user);

        socket.broadcast.emit(
          'message',
          formatMessage(message.username, message.txt)
        );
      });
      //this runs when the user disconnects from the server
      socket.on('disconnect', () => {
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('message', 'A user has left the room');
      });
    });
  } catch (err) {
    console.log(
      chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err))
    );
  }
};
const initSocket = (server) => {
  const io = socket(server);
  createWSEvents(io);
};

module.exports = initSocket;
