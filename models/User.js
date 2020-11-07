import client from './Client.js';
import config from 'config';

const dbConfig = config.get('db');
const dbName = dbConfig.name;

const insertUser = ({ user, pass }) => {
  return new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        const users = db.collection('users');
        try {
          const findedUser = await users.findOne({ user });
          if (findedUser) {
            return reject('User already exist');
          }
          await users.insertOne({ user, pass: encrypt(pass) });
          console.log('User created: ', user, encrypt(pass))
        } catch (e) {
          reject(e);
        }
      }
    });
  })
};

const getUser = ({ user, pass }) => {
  return new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        reject(err);
      } else {
        const db = client.db(dbName);
        const users = db.collection('users');
        try {
          const findedUser = await users.findOne({ user: user });
          console.log('db res:', findedUser);
          resolve(findedUser);
        } catch (e) {
          console.log('Error while getting from DB');
          reject(e);
        }
      }
    });
  })
};

client.close(); // in another place

export default { getUser, insertUser };