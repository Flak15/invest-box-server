const MongoClient = require('mongodb').MongoClient;
const config = require('config');

// Connection URL
const dbConfig = config.get('db');

const url = dbConfig.url;

module.exports = new MongoClient(url, dbConfig);
