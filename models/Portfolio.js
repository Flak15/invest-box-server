import client from './Client.js';
import config from 'config';

const dbConfig = config.get('db');
const dbName = dbConfig.name;

const addInstument = async ({ userId, symbol, value }) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.createIndex({ symbol: 1, userId: 1 }, { unique: true }); // unique by symbol and username
    await portfolio.insertOne({ userId, symbol, value });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const removeInstrument = async ({ userId, symbol }) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.deleteOne({ userId, symbol });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
const updateValue = async ({ userId, symbol, value }) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.updateOne({ userId, symbol }, { $set: { value }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getPortfolio = async ({ userId }) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    const cursor = portfolio.find({ userId });
    return await cursor.toArray();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export default { addInstument, removeInstrument, getPortfolio, updateValue };