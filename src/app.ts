import config from 'config';
import app from './api/index.js'
import runBackground from './background/index.js';
import client from './models/Client.js';
import initDb from './initDb.js';

const port = config.get('port');

client.connect()
  .then(() => {
    console.log('Db connected');
    initDb();
    app.listen(port, function () {
      console.log(`Server listening on port ${port}!`);
    });
    runBackground();
  })
  .catch((e: Error) => {
    console.log(e.message);
    process.exit(1);
  });