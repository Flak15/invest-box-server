import client from './Client.js';
import config from 'config';

import { IdbConfig, Iuser } from '../types/index';

const dbConfig: IdbConfig = config.get('db');
const dbName = dbConfig.name;
interface IinsertUser {
  username: string,
  password: string
}
const insertUser = async ({ username, password }: IinsertUser) => {
  const db = client.db(dbName);
  const users = db.collection('users');
  await users.createIndex({ username: 1 }, { unique: true });
  await users.insertOne({ username, password });
  client.close();
};
interface IgetUser {
  username: string,
}
const getUser = async ({ username }: IgetUser): Promise<Iuser | null> => {
  const db = client.db(dbName);
  const users = db.collection('users');
  try {
    return await users.findOne({ username });
  } catch (e) {
    console.log('Error while getting user from DB: ', e.message);
    throw new Error(e);
  }
};

export default { getUser, insertUser };