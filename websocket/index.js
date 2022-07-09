const socket = require('socket.io');
const formatMessage = require('../logic/message');
// const chalk = require('chalk');
const { promisify } = require('util');
const { User, Room } = require('../models');
const { json } = require('express/lib/response');
const getRandomWord = require('../logic/getRandomWord');
// const { getCurrentUser } = require('../logic/user');

//past messages that were stored in the database
const bot = 'DÜDLE Bot';
const users = {};
let randomWord = '';

const createWSEvents = async (io) => {
  // io.on = promisify(io.on);
  try {
    //this runs when the user connects to the server
    io.on('connection', (socket) => {
      // console.log(chalk.green('CONNECTED TO SOCKET!!! SOCKET ID:', socket.id));

      // console.log(`creating Room`);
      // socket.on('createRoom', () => {
      //   const { room_name, user_name } = JSON.parse(data);
      //   console.log('CREETE ROOM');
      //   // const newUser = {
      //   //     user_id: user.id,
      //   //     socket_id: socket.id,
      //   // }
      //   //check to see if someone already made a room with the same id

      //   console.log(chalk.cyan(room_name, user_name));

      //   console.log(chalk.yellow('Creating Room: ', room_name));
      // });

      socket.on('join room', (data) => {
        const { room_name, join_username } = JSON.parse(data);
        // console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!`, room_name, join_username);
        // const newUser = userJoin(username, room, socket.id )

        socket.join(room_name); // needs a unique identifier for the rooom

        socket.emit('message', formatMessage(bot, `Welcome to DÜDL!`));
        //broadcast to all users except for the actual user that joined that a new user has joined
        io.to(room_name).emit(
          'message',
          formatMessage(bot, `A user has joined the chat!`)
        );
      });
      //emit random word to one user only
      socket.on('randomWord', async (data) => {
        console.log('socket', socket);
        const { room_name, user_name } = JSON.parse(data);

        // console.log(chalk.yellow('Getting Random Word: ', room_name));
        randomWord = await getRandomWord();
        io.to(room_name).emit('word selected', { artist: user_name });

        //broadcast to artist their word
        io.to(socket.id).emit(
          'message',
          formatMessage(bot, `Your word is: ${randomWord?.dataValues?.word}`)
        );
      });

      //this runs when the user sends a message
      socket.on('Chat Message', async (data) => {
        const { user_name, message, room_name } = JSON.parse(data);
        // console.log(chalk.blue(`Message Received: ${message}`));

        //check to see if guessed word is correct
        if (message.toLowerCase() === randomWord?.dataValues?.word) {
          io.to(room_name).emit(
            'message',
            formatMessage(bot, `${user_name} guessed the word!`)
          );

          io.to(room_name).emit('stopGame');
          io.to(socket.id).emit('message', formatMessage(user_name, message));
        } else {
          io.to(room_name).emit('message', formatMessage(user_name, message));
        }
      });

      // 🧑‍🎨 broadcast drawing to all users
      socket.on('drawing', ({ room_name, ...ctx }) => {
        socket.to(room_name).emit('drawing-board', ctx);
      });

      //this runs when the user disconnects from the server
      socket.on('disconnect', () => {
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('message', 'A user has left the room');
      });
    });
  } catch (err) {
    console.log(
      // chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err))
      err
    );
  }
};
const initSocket = (server) => {
  const io = socket(server);
  createWSEvents(io);
};

module.exports = initSocket;
