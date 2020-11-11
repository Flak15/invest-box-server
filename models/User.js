import client from './Client.js';
import config from 'config';
import encrypt from '../services/encrypt.js';
const dbConfig = config.get('db');
const dbName = dbConfig.name;

const insertUser = async ({ user, pass }) => {
  const db = client.db(dbName);
  const users = db.collection('users');
  await users.createIndex({ user: 1 }, { unique: true });
  await users.insertOne({ user, pass: encrypt(pass) });
  client.close();
};

const getUser = async ({ user }) => {
  const db = client.db(dbName);
  const users = db.collection('users');
  try {
    return await users.findOne({ user: user });
  } catch (e) {
    console.log('Error while getting user from DB: ', e.message);
    throw new Error(e);
  }
};

export default { getUser, insertUser };