const mongoose = require('mongoose');

mongoose.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});


module.exports = mongoose;


