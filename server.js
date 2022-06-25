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

//session config
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks (just an example, you can decide how long to keep session alive)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

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
    app.listen(PORT, () => console.log('👂🏻 Now listening 👂🏻'));
  });
  