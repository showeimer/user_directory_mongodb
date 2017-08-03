const express = require('express');
const routes = express.Router();
const db = require('../db');

// Home page
routes.get('/', function(request, response) {
  let collection = db.get().collection('userDirectory');

  collection.find({}).toArray((err, userDirectory) => {
    response.render('index', {userDirectory: userDirectory});
  });
});

// Unemployed users page
routes.post('/unemployed', function(request, response) {
  let unemployed = db.get().collection('userDirectory');

  unemployed.find({job: null}).toArray((err, userDirectory) => {
    response.render('unemployed', {userDirectory: userDirectory});
  });
});

// Employed users page
routes.post('/employed', function(request, response) {
  let employed = db.get().collection('userDirectory');

  employed.find({job: {$nin: [null]}}).toArray((err, userDirectory) => {
    response.render('unemployed', {userDirectory: userDirectory});
  });
});

// Individual pages
routes.get('/users/:user', function(request, response) {
  let userName = request.params.user;
  let collection = db.get().collection('userDirectory');

  collection.find({username: userName}).toArray((err, userDirectory) => {
    console.log(userDirectory);
    response.render('user', {userDirectory: userDirectory});
  });
});

// Search bar results
routes.post('/search', function(request, response) {
  let searchCollection = db.get().collection('userDirectory');
  let search = request.body.search;
  console.log(search);

  searchCollection.find({$or: [{'address.country': search}, {skills: search}]}).toArray((err, userDirectory) => {
    response.render('searchResults', {userDirectory: userDirectory});
  });
});

module.exports = routes;
