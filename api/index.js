import cors from 'cors';
import express from 'express';
import User from '../models/User.js';
import basicAuth from 'express-basic-auth';
import encrypt from '../services/encrypt.js';

import portfolio from './portfolio.api.js';

var app = express();
app.use(express.json());

const testAuth = (username, password, cb) => {
  User.getUser({ user: username }).then(finded => {
    if (!finded) {
      return cb(null, false);
    }
    const isAuthenticated = finded.pass === encrypt(password);
    cb(null, isAuthenticated);
  });
};

app.post('/user', async (req, res) => {
  const { user, pass } = req.body;
  try {
    await User.insertUser({ user, pass });
    res.end('User created');
  } catch (e) {
    res.json({ message: e.message });
  }
});
app.use(cors());

app.use(basicAuth({ authorizer: testAuth, authorizeAsync: true, unauthorizedResponse: 'Authorization failed' }));
app.use('/portfolio', portfolio);

app.get('/', function (req, res) {
  res.send('ok');
});


app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});

export default app;
