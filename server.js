// Import modules
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));

app.get("/", async (req, res) => {
    res.send("hello, friend!");
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

