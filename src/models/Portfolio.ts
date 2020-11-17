import client from './Client.js';
import config from 'config';
import { IdbConfig } from '../types/index';
const dbConfig: IdbConfig = config.get('db');
const dbName = dbConfig.name;
interface IaddInstument {
  userId: string,
  symbol: string,
  value: number,
}
const addInstument = async ({ userId, symbol, value }: IaddInstument) => {
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
interface IremoveInstrument {
  userId: string,
  symbol: string,
}
const removeInstrument = async ({ userId, symbol }: IremoveInstrument) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.deleteOne({ userId, symbol });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
interface IupdateValue {
  userId: string,
  symbol: string,
  value: number,
}
const updateValue = async ({ userId, symbol, value }: IupdateValue) => {
  try {
    const db = client.db(dbName);
    const portfolio = db.collection('portfolio');
    await portfolio.updateOne({ userId, symbol }, { $set: { value }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
interface IgetPortfolio {
  userId: string,
}
const getPortfolio = async ({ userId }: IgetPortfolio): Promise<any[]> => {
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