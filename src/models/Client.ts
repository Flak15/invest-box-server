import { IdbConfig } from '../types/index';

import MongoDB from 'mongodb';
import config from 'config';

const { MongoClient } = MongoDB;

const dbConfig: IdbConfig = config.get('db');
const url: string = dbConfig.url;
const client = new MongoClient(url, dbConfig);

export default client;