const config = require('config');
var cors = require('cors');
var express = require('express');
var db = require('./db');
var app = express();
const basicAuth = require('express-basic-auth')
const usersDB = config.get('auth');

app.use(cors());

app.post('/user', (req, res) => {
  db.insertUser({ user: 'user1', pass: '123' });
  res.send('Done');
});

app.use(basicAuth(usersDB));

app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});

app.use((req, res, next) =>  {
  // res.send('Not found');
  console.log(req.path, 'Not found');
  return next();
});

app.use((req, res) =>  {
  res.send('Not found');
});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
