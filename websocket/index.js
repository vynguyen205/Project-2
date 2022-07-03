const socket = require('socket.io');
const chalk = require('chalk');
const { promisify } = require('util');
const { User } = require('../models');

const users = [];

const createWSEvents = async io => {
    io.on = promisify(io.on);
    try {
        io.on('connection', socket => {
            console.log(chalk.green(`Client Connected`));
            socket.on("💃🏻 Join Server", (user) => {
                console.log(socket.id, "socket id")
                console.log("payload", user)
                //adding the new user to the array of users connected to the server
                User.create({
                    ...user,
                    socket_id: socket.id
                })
                //broadcasting the user to all other users. letting them know that a new user has joined
                socket.broadcast.emit("New User: ", users);
            });

            //setting up event for when user joins room
            socket.on("Join Room", ({roomName, user}) => {
                socket.join(roomName);
               //update the room with the new user

               //broadcasting the user to all other users. letting them know that a new user has joined
                socket.to(roomName)
                //you can also chain the to method to broadcast to multiple rooms
                // .to("another room")
                .emit("New User: ", users);
            });

            socket.on("Send Message", ({ content, to, sender, chatName, isChannel }) => {
                //isChannel = public channel --- is not a channel = private message (DM)
                if (isChannel) {
                    const payload = {
                        content,
                        sender,
                        chatName,
                    };
                    //broadcasting the message to all users in the room
                    // this "to" is the room name
                    socket.to(to).emit("New Message", payload);

                } else { //private message
                    const payload = {
                        content,
                        sender,
                        // this is saying the name of the chat is the name of the user that is sending the message
                        chatName: sender
                    };
                    //broadcasting the message to the user that sent the message
                    // this "to" is the user id
                    socket.to(to).emit("New Message", payload);
                }
                // dig in to the message object and make sure the it exists in this chat room
                if (messages[chatName]) {
                    messages[chatName].push({
                        content,
                        sender,
                    });
                }
            });
            socket.on("create", (roomId) => {
                console.log("creating room", roomId);
                //check to see if someone already made a room with the same id

                //if not create a new room in db, send res to client

                //also 
                //else send error to client
            });
            socket.on("Disconnect", () => {
                //removing the user from the array of users connected to the server
                users = users.filter(user => user.id !== socket.id);
                //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
                io.emit("New User", users);
            });

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