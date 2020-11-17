import MongoDB from 'mongodb';
import config from 'config';

const MongoClient = MongoDB.MongoClient;

const dbConfig = config.get('db');
const url = dbConfig.url;
const client = new MongoClient(url, dbConfig);

export default client;