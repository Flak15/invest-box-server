const config = require('config');

var express = require('express');
var app = express();
const basicAuth = require('express-basic-auth')
const usersDB = config.get('auth');

app.use(basicAuth(usersDB));

app.get('/', function (req, res) {
  res.send('Hello World! ');
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
