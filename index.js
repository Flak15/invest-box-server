var express = require('express');
var app = express();
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}));

app.get('/', function (req, res) {
  res.send('Hello World! ' + req.auth.user);
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!');
});
