const socket = require('socket.io');
const formatMessage = require('../logic/message');
const chalk = require('chalk');
const { promisify } = require('util');
const { User, Room } = require('../models');
const {userJoin, getCurrentUser} = require('../public/js/users');

const users = [];
const bot = 'DÜDLE bot';

const createWSEvents = async io => {
    io.on = promisify(io.on);
    try {
        //this runs when the user connects to the server
        io.on('connection', socket => {
            console.log(chalk.green(`Client Connected`, socket.id));
            socket.on('joinRoom', ({user, room}) => {
                const newUser = userJoin (socket.id, username, room)
                socket.join (newUser, room);
           
            socket.emit ('message', formatMessage(bot, `Welcome to DÜDLE!`))
        
        //broadcast to all users that a new user has joined
        socket.broadcast.to(newUser.room).emit('message', formatMessage(bot, `${newUser.username} has joined the chat!`));
        });
        //this runs when the user disconnects from the server
        socket.on("disconnect", () => {
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit('message', 'A user has left the romm');
        })
        //this runs when the user sends a message
        socket.on('Chat Message', (message) => {
            console.log(chalk.blue(`Message Received: ${message}`));
            const newUser = getCurrentUser(socket.id);
            io.to(newUser.room).emit('message', formatMessage('user.username', message));
        })
    });

    } catch (err) {
    console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, JSON.stringify(err)));
    }
}
const initSocket = (server) => {
    const io = socket(server);
    createWSEvents(io);
}


module.exports = initSocket;