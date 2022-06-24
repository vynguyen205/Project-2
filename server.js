const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;