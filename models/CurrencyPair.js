import client from './Client.js';
import config from 'config';

const dbConfig = config.get('db');
const dbName = dbConfig.name;

const insertPair = async ({ ticker, value }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const pairs = db.collection('CurrencyPairs');
    await pairs.insertOne({ ticker, value });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getPair = async ({ ticker }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const pairs = db.collection('CurrencyPairs');
    return await pairs.findOne({ ticker });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const updatePair = async ({ ticker, value }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const pairs = db.collection('CurrencyPairs');
    await pairs.updateOne({ ticker }, { $set: { value }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export default { insertPair, getPair, updatePair };