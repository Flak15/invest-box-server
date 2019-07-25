const config = require('config');
const cors = require('cors');
const express = require('express');
const user = require('../models/user');
const basicAuth = require('express-basic-auth');

const app = express();
const testAuth = (username, pass, cb) => {
  console.log(`username: ${username}`);
  user.getUser({ user: username, pass: pass }).then(r => {
    cb(null, r.length === 1);
  });
};

app.get('/user', (req, res) => {
  user.insertUser({ user: 'user1', pass: '123' });
  res.send('Done');
});

app.use(cors());

app.use(basicAuth({ authorizer: testAuth, authorizeAsync: true, }));

app.get('/', (req, res) => res.send(`Hello, ${req.auth.user}`))

app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});

function run() {
  app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
  });
}


module.exports = { run };
