import client from './Client.js';
import config from 'config';

const dbConfig = config.get('db');
const dbName = dbConfig.name;

const addInstument = async ({ userId, symbol, value }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.ensureIndex({ symbol: 1 }, { unique: true });
    await portfolio.insertOne({ userId, symbol, value });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  } finally {
    // await client.close();
  }
};

const removeInstrument = async ({ userId, symbol }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.deleteOne({ userId, symbol });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  } finally {
    // await client.close();
  }
};
const updateValue = async ({ userId, symbol, value }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.updateOne({ userId, symbol }, { $set: { value }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  } finally {
    // await client.close();
  }
};

const getPortfolio = async ({ userId }) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    const cursor = portfolio.find({ userId });
    return await cursor.toArray();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  } finally {
    // await client.close();
  }
};

export default { addInstument, removeInstrument, getPortfolio, updateValue };