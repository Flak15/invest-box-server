import MongoDB from 'mongodb';
import config from 'config';

const MongoClient = MongoDB.MongoClient;

const dbConfig = config.get('db');
const url = dbConfig.url;
// const client = new MongoClient(url, dbConfig);
const client = new MongoClient(url, { "useNewUrlParser": true, "useUnifiedTopology": true });

export default client;