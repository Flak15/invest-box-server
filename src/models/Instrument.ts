import client from './Client.js';
import config from 'config';
import { IdbConfig, IpriceData, Iinstrument, IsummaryDetail } from '../types/index';

const dbConfig: IdbConfig = config.get('db');
const dbName = dbConfig.name;

const addInstrument = async ({ symbol, price, priceData, financialData }: IpriceData) => {
  try {
    const db = client.db(dbName);
    const instruments = db.collection('Instruments');
    await instruments.createIndex({ symbol: 1 }, { unique: true }); // отдельная проверка
    await instruments.insertOne({ symbol, price, priceData, financialData });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
interface IgetInstrument {
  symbol: string
}
const getInstrument = async ({ symbol }: IgetInstrument): Promise<Iinstrument | null> => {
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
  price?: number,
  financeData?: IsummaryDetail
}
const updateInstrument = async ({ symbol, price, financeData }: IupdateInstrument ) => {
  try {
    const db = client.db(dbName);
    const Instruments = db.collection('Instruments');
    await Instruments.updateOne({ symbol }, { $set: { price, financeData }});
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

const getAllInstruments = async (): Promise<Iinstrument[]> => {
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