"use strict";
exports.__esModule = true;
var config_1 = require("config");
var index_js_1 = require("./api/index.js");
var Client_js_1 = require("./models/Client.js");
var port = config_1["default"].get('port');
Client_js_1["default"].connect()
    .then(function () {
    console.log('Db connected');
    index_js_1["default"].listen(port, function () {
        console.log("Server listening on port " + port + "!");
    });
    // runBackground();
})["catch"](function (e) {
    console.log(e.message);
    process.exit(1);
});
