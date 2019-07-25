const MongoClient = require('mongodb').MongoClient;
const config = require('config');

// Connection URL
const dbConfig = config.get('db');

const url = dbConfig.url;

// Database Name
const dbName = dbConfig.name;
const client = new MongoClient(url, dbConfig);

// const interactWithDB = (fn) => {
//   client.connect(async (err) => {
//     if (err) {
//       reject(err);
//     } else {
//       console.log("Connected successfully to server");
//       const db = client.db(dbName);
//       try {
//         await fn;
//       } catch (e) {
//         reject(e);
//       }
//       client.close();
//     }
//   });
// }


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

      }
    });
  })
};

const getUser = ({ user, pass }) => {
  return new Promise((resolve, reject) => {
    client.connect(async (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const users = db.collection('users');
        try {
          await users.find({ user: user, pass: pass }).toArray((error, doc) => {
            if (error) reject(error);
            console.log(doc);
            resolve(doc);
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  })
};

client.close();

module.exports = {
  insertUser, getUser
};
