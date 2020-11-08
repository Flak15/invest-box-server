import config from 'config';
import app from './api/index.js'

const port = config.get('port');
app.listen(port, function () {
  console.log(`Server listening on port ${port}!`);
});