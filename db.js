const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'investBoxDB';
const client = new MongoClient(url, { useNewUrlParser: true });

const interactWithDB = (fn) => {
  client.connect(async (err) => {
    if (err) {
      reject(err);
    } else {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      try {
        await fn;
      } catch (e) {
        reject(e);
      }
      client.close();
    }
  });
}


const insertUser = ({ user, pass }) => {
  return new Promise((resolve, reject) => {

    client.connect(async (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const users = db.collection('users');
        try {
          await users.insertOne({ user, pass });
        } catch (e) {
          reject(e);
        }
        client.close();
      }

    });
  })
};



module.exports = {
  insertUser,
};
