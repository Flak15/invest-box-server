import config from 'config';
import cors from 'cors';
import express from 'express';
import User from '../models/User.js';
import basicAuth from 'express-basic-auth';
import encrypt from '../services/encrypt.js';

import portfolio from './portfolio.api.js';

var app = express();
app.use(express.json());

const testAuth = (username, pass, cb) => {
  User.getUser({ user: username }).then(finded => {
    if (!finded) {
      return cb(null, false);
    }
    const isAuthenticated = finded.pass === encrypt(pass);
    cb(null, isAuthenticated);
  });
};
app.use('/portfolio', portfolio);
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

// app.use(basicAuth({ authorizer: testAuth, authorizeAsync: true, unauthorizedResponse: 'Authorization failed' }));




app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});

export default app;
