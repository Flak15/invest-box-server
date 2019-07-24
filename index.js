const config = require('config');
var cors = require('cors');
var express = require('express');
var db = require('./db');
var app = express();
const basicAuth = require('express-basic-auth');

const testAuth = (username, pass, cb) => {
  const usersDB = config.get('auth');
  console.log(`username: ${username}`);
  db.getUser({user: username, pass: pass}).then(r => {
    cb(null, r);
    console.log(r);
  });

};

app.use(cors());

app.post('/user', (req, res) => {
  db.insertUser({ user: 'user1', pass: '123' });
  res.send('Done');
});

app.use(basicAuth({ authorizer: testAuth, authorizeAsync: true, }));

app.get('/', (req, res) => res.send(`Hello, ${req.auth.user}`))

app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});


app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
