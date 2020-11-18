import cors from 'cors';
import express from 'express';
import User from '../models/User.js';
import basicAuth from 'express-basic-auth';
import encrypt from '../services/encrypt.js';
import portfolio from './portfolio.api.js';
import instrument from './instrument.api.js';
import { IauthData } from '../types/index';
const app = express();
app.use(express.json());


const basicAuthorizer = (username: string, password: string, cb: (e: Error | null, r: boolean)=>any) => {
  User.getUser({ username }).then(finded => {
    if (!finded) {
      return cb(null, false);
    }
    const isPassEqual: boolean = finded.password === encrypt(`${username}.${password}`);
    cb(null, isPassEqual);
  });
};

app.post('/user', async (req, res) => {
  const { username, password }: IauthData = req.body;
  console.log(username, password);
  try {
    await User.insertUser({ username, password: encrypt(`${username}.${password}`) });
    res.end('User created');
  } catch (e) {
    res.json({ message: e.message });
  }
});
app.use(cors());

app.use(basicAuth({ authorizer: basicAuthorizer, authorizeAsync: true, unauthorizedResponse: 'Authorization failed' }));
app.get('/', function (_, res) {
  res.send('ok');
});
app.use('/portfolio', portfolio);
app.use('/instrument', instrument);




// app.get('/context', function (req, res) {
//   res.send({ user: req.auth.user });
// });

export default app;
