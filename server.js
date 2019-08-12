const config = require('config');
// const debug = require('debug')('app:startup');
const express = require('express');
const mongoose = require('mongoose');
const reservations = require('./routes/reservations');
const app = express();

// Connect Mongodb

mongoose
  .connect(`${config.get('mongodb.port')}`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    console.log(config.get('mongodb.port'));
  })
  .catch(err => console.log('Cound not connect to MongoDB... ', err));

//Routes
app.use(express.json());
app.use('/api/reservations', reservations);

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`listenning to port ${port}...`);
});
