const express = require('express');
var bodyParser = require('body-parser');
var app = express();
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {

    if (err){
        return console.log(err)
    }

    var port = process.env.PORT || 3000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });

});
//
// module.exports = {
//     port: process.env.port || process.env.PORT || '3005',
//     mongoUrl: process.env.MONGODB_URI || `mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5`
// }