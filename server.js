//required libraries
const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
// const exphbs = require('express-handlebars');


var io = socket(server);


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//bring in handlebars modules

const app = express();
const PORT = process.env.PORT || 3001;

//Define template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//this allows you to parse the body of the request
app.use(express.json());
//this allows you to use the req.body object to access the body of the request
app.use(express.urlencoded({ extended: true }));
// this allows you to use a static folder (unchanged files)
app.use(express.static(path.join(__dirname, 'public')));

//defined routes for the app
app.use(routes);

// connect-session-sequelize middleware
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  