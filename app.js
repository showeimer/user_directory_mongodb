const express = require('express');
const mustacheExpress = require('mustache-express');
const usersRoutes = require('./routes/users');
const db = require('./db');
const app = express();
const bodyParser = require('body-parser');

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// load static files in public folder
app.use(express.static('public'));

let url = 'mongodb://localhost:27017/newdb'

// Use my routing file
app.use('/', usersRoutes);

db.connect(url, (err, connection) => {
  if (!err) console.log('connected to mongo');
  app.listen(3000, () => console.log('app started'));
});
