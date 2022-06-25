const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');

const app = express();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3001;