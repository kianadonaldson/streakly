const express = require('express');
const app = express();
const port = process.env.port || 5000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const cors = require('cors');
const Controller = require('./controllers.js');

// app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`We be listening on port ${port}`);
});