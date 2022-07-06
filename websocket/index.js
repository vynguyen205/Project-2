const socket = require('socket.io');
const formatMessage = require('../logic/message');
const chalk = require('chalk');
const { promisify } = require('util');
const { User, Room } = require('../models');
// const { userJoin, getCurrentUser } = require('../public/js/users');

const users = [];
const bot = 'DÜDLE bot';

const createWSEvents = async (io) => {
  io.on = promisify(io.on);
  try {
    //this runs when the user connects to the server
    io.on('connection', (socket) => {
      console.log(chalk.green(`Client Connected`, socket.id));
      //   socket.broadcast.emit('newId', socket.id);

      socket.on('joinRoom', ({ user, room }) => {
        console.log(user, room);
        // const newUser = userJoin(username, room, socket.id )
        socket.join(room); // needs a unique identifier for the rooom

        socket.emit('message', formatMessage(bot, `Welcome to DÜDLE!`));

        //broadcast to all users that a new user has joined
        socket.broadcast.emit(
          'message',
          formatMessage(bot, `a new user has joined the chat!`)
        );
      });
      //this runs when the user disconnects from the server
      socket.on('disconnect', () => {
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('message', 'A user has left the room');
      });
      //this runs when the user sends a messageFGVE
      socket.on('Chat Message', async (message) => {
        console.log(chalk.blue(`Message Received: ${message}`));
        // const newUser = await getCurrentUser(socket.id);
        // console.log(newUser)
        io.emit('message', formatMessage('User', message));
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
