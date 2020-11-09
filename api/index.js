import config from 'config';
import cors from 'cors';
import express from 'express';
import User from '../models/User.js';
import basicAuth from 'express-basic-auth';
import encrypt from '../encrypt.js';

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
app.post('/user', (req, res) => {
  const { user, pass } = req.body;
  // console.log("new user: ", user, pass);
    User.insertUser({ user, pass })
      .then(() => {
        res.send('Done');
      }).catch(e => res.send(e));
});
app.use(cors());

// app.use(basicAuth({ authorizer: testAuth, authorizeAsync: true, unauthorizedResponse: 'Authorization failed' }));




app.get('/context', function (req, res) {
  res.send({ user: req.auth.user });
});

export default app;
