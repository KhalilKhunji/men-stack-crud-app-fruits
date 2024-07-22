// Import modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Database
require('./config/database');

const Fruit = require("./models/fruit.js");

const app = express();

// Controllers
const fruitsCtrl = require('./controllers/fruits');

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

// Routes

// Landing Page
app.get('/', fruitsCtrl.landing);

// Fruits
app.get('/fruits/new', fruitsCtrl.fruitNew);

app.post('/fruits', fruitsCtrl.fruitsPost);

app.get('/fruits', fruitsCtrl.fruitsGet);

app.get('/fruits/:fruitId', fruitsCtrl.fruitIdGet);

app.delete('/fruits/:fruitId', fruitsCtrl.fruitDelete);

app.get('/fruits/:fruitId/edit', fruitsCtrl.fruitEdit);

app.put('/fruits/:fruitId', fruitsCtrl.fruitUpdate);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

