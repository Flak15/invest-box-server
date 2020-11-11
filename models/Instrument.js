import client from './Client.js';
import config from 'config';

const dbConfig = config.get('db');
const dbName = dbConfig.name;

const addInstrument = async ({ symbol, shortName, price }) => {
  try {
    const db = client.db(dbName);
    const instruments = db.collection('Instruments');
    await instruments.createIndex({ symbol: 1 }, { unique: true });
    await instruments.insertOne({ symbol, price, shortName });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getInstrument = async ({ symbol }) => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    return await Instruments.findOne({ symbol });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const updateInstrument = async ({ symbol, price }) => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    await Instruments.updateOne({ symbol }, { $set: { price }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getAllInstruments = async () => {
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