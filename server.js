require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ordersRouter } = require('./src/routes/orders-router.js');
const { pharmsRouter } = require('./src/routes/pharms-router.js');

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_STRING);

app.use('/', [ordersRouter, pharmsRouter]);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
