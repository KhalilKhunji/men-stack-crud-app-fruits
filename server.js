// Import modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

// Database
require('./config/database');

const Fruit = require("./models/fruit.js");

const app = express();

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

// Routes

// Landing Page
app.get("/", (req, res, next) => {
    res.render("index.ejs");
});

// Fruits
app.get('/fruits/new', (req, res, next) => {
  res.render('fruits/new.ejs');
});

app.post("/fruits", async (req, res, next) => {
  // Converting data from checkbox ('on' or 'off') to Boolean
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  };
  await Fruit.create(req.body);
  res.redirect("/fruits");
});

app.get('/fruits', async (req, res, next) => {
  const fruits = await Fruit.find();
  res.render('fruits/index.ejs', {fruits});
});

app.get("/fruits/:fruitId", async (req, res, next) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/show.ejs", { fruit: foundFruit });
});

app.delete("/fruits/:fruitId", async (req, res, next) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: foundFruit,
  });
});

app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  };
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  res.redirect(`/fruits/${req.params.fruitId}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

