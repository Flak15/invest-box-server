import client from './Client.js';
import config from 'config';
import encrypt from '../services/encrypt.js';
const dbConfig = config.get('db');
const dbName = dbConfig.name;

const insertUser = async ({ user, pass }) => {
  await client.connect();
  const db = client.db(dbName);
  const users = db.collection('users');
  await users.ensureIndex({ user: 1 }, { unique: true });
  await users.insertOne({ user, pass: encrypt(pass) });
  await client.close();
};

const getUser = ({ user }) => {
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