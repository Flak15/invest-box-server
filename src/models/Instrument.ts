import client from './Client.js';
import config from 'config';
import { IdbConfig, IpriceData } from '../types/index';

const dbConfig: IdbConfig = config.get('db');
const dbName = dbConfig.name;

const addInstrument = async ({ symbol, shortName, price, currency }: IpriceData) => {
  try {
    const db = client.db(dbName);
    const instruments = db.collection('Instruments');
    await instruments.createIndex({ symbol: 1 }, { unique: true });
    await instruments.insertOne({ symbol, price, shortName, currency });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
interface IgetInstrument {
  symbol: string
}
const getInstrument = async ({ symbol }: IgetInstrument) => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    return await Instruments.findOne({ symbol });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
interface IupdateInstrument {
  symbol: string,
  price: number
}
const updateInstrument = async ({ symbol, price }: IupdateInstrument) => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    await Instruments.updateOne({ symbol }, { $set: { price }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getAllInstruments = async (): Promise<any[]> => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    return await Instruments.find({}).toArray();
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export default { addInstrument, getInstrument, updateInstrument, getAllInstruments };