//required libraries
const express = require('express');
const chalk = require('chalk');
const routes = require('./controllers');
const http = require('http');
const socket = require('socket.io');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const path = require('path');
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = http.createServer(app);
const io = socket(server);
const PORT = process.env.PORT || 3001;

// Define template engine to use
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
//blank users object to store all the users connected to the server
let users = [];
//store past messages that were stored in the database
const messages = {
  general: [],
  random: [],
  jokes: [],
  javascript: [],
};
    
const start = () => {
  try {
    io.on('connection', socket => {
      console.log(chalk.green(`Client Connected`));
      socket.on("💃🏻 Join Server", (username) => {
        const user = {
          //assigning the unique socket id to the user
          username,
          //every user has a unique socket id
          id: socket.id
        };
        //adding the new user to the array of users connected to the server
        users.push(user);
        //broadcasting the user to all other users. letting them know that a new user has joined
        socket.broadcast.emit("New User", users);
      });
      //setting up event for when user joins room
      socket.on("Join Room", (roomName, cb) => {
        socket.join(roomName);
        // this function is to ensure when a user joins late, they get the messages that were already stored in the messages object
        cb(messages[roomName]);
      });
    
      socket.on("Send Message", ({content, to, sender, chatName, isChannel}) => {
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
        if (messages[chatName]){
            messages[chatName].push({
            content,
            sender,
          });
        }
      });
      socket.on("Disconnect", () => {
        //removing the user from the array of users connected to the server
        users = users.filter(user => user.id !== socket.id);
        //broadcasting the user to all other users. letting them know that a user has left and there's only that many users left
        io.emit("New User", users);
      });
    });
  } catch (err) {
      console.log(chalk.redBright(`🚨🚨🚨 SOMETHING WENT WRONG 🚨🚨🚨`, err));
    }
};

//settinng up event for when user connects
    //session config
// const sess = {
  //   secret: 'Super secret secret',
  //   cookie: {
    //     maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks (just an example, you can decide how long to keep session alive)
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));


// this allows you to parse the body of the request
// app.use(express.json());
// // this allows you to use the req.body object to access the body of the request
// app.use(express.urlencoded({ extended: true }));
// this allows you to use a static folder (unchanged files)

//defined routes for the app
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(chalk.greenBright(`🌎 API Server now listening on http://localhost:${PORT} 🌎`)));
});

start();
