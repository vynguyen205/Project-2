//required libraries
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
// const exphbs = require('express-handlebars');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//bring in handlebars modules

const app = express();
const PORT = process.env.PORT || 3001;

//Define template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//express built-in middleware to serve static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//defined routes for the app
app.use(routes);

// connect-session-sequelize middleware
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  