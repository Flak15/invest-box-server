const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'investBoxDB';

const insertUser = ({ user, pass }) => {
  return new Promise((resolve, reject) => {
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true });

    // Use connect method to connect to the Server
    client.connect(async function(err) {
      if (err) {
        reject(err);
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const users = db.collection('users');
        try {
          await users.insertOne({ user, pass});
        } catch (e) {
          reject(e);
        }
        client.close();
      }
    });
  })
}

module.exports = {
  insertUser,
};
