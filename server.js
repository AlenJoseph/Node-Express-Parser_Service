const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// route declaration
const parse = require('./routes/api/parser');
// routes

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Congif
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.info('MongoDb Connected'))
  .catch(err => console.warn(err));

// Users Routes
app.use(cors());
app.use('/api/parser', parse);

const port = process.env.PORT || 5000;

app.listen(port, () => console.info(`Server is running on Port ${port}`));
