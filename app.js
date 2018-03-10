const express = require('express');
var bodyParser = require('body-parser');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

require('./mangoose');



var userSchema = mongoose.Schema({
// the record model in bd
    title: String,
    content: String,
    status: String
});

var Items = mongoose.model("Items", userSchema);


app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get("/", function (req, res) {
    Items.find({}, function (err, result) {
        if (!err) {
            res.render('index.ejs', {result: result});
        }
    });
});


// output page of a new item
app.get("/write", function (req, res) {
    res.render("write.ejs")
});

app.get("/active", function (req, res) {
    Items.find({status: 'active'}, function (err, result) {
        if (!err) {
            res.render('active.ejs', {result: result});
        }
    });
});

app.get("/completed", function (req, res) {
    Items.find({status: 'done'}, function (err, result) {
        if (!err) {
            res.render('completed.ejs', {result: result});
        }
    });
});

// save the new item to the base / redirect
app.post("/write", function (req, res) {

   var obj = {
        title: req.body.title,
        content: req.body.content,
        status: 'active'
    };


    Items.create({title: obj.title, content: obj.content, status: obj.status}, function (err) {
        if (err) return console.log(err);
        console.log("Сохранен объект item");
    });

    res.redirect('/');
});



// delay item from database
app.get("/remove/:id", function (req, res) {

    var id = req.params.id;

    Items.deleteOne({_id: id}, function (err) {
        if (err) return console.log(err);
        console.log("Removed");
    });

    res.redirect('/');
});



// delat all items from base
app.get("/removeall", function (req, res) {

    Items.remove({});
    res.redirect('/');
});


//editing sinle item
app.get("/edit/:id", function (req, res) {

    var id = req.params.id;

    Items.findOne({_id: id}, function (err, result) {
        if (!err) {
            res.render('edit.ejs', {result: result});
        }
    });


});


//save editing
app.post("/saveEdited/:id", function (req, res) {

    var id = req.params.id;

    var title = req.body.title;
    var content = req.body.content;

    var query = {_id: id};

    var newItems = {$set: {title: title, content: content}};

    Items.updateOne(query, newItems, function (err) {
        if (err) throw err;
    });

    res.redirect('/');

});

//saving done status in database
app.get("/done/:id", function (req, res) {

    var id = req.params.id;

    var query = {_id: id};

    var newItems = {$set: {status: "done"}};

    Items.updateOne(query, newItems, function (err) {
        if (err) throw err;
    });

    res.redirect('/');
});


app.get("/item/:id", function (req, res) {

    var id = req.params.id;

    Items.findOne({_id: id}, function (err, result) {
        if (!err) {
            res.render('single.ejs', {result: result});
        }
    });

});


MongoClient.connect('mongodb://root:root@ds133136.mlab.com:33136/heroku_5f0kbkt5', function (err) {

    if (err){
        return console.log(err)
    }

    var port = process.env.PORT || 3000;
    app.listen(port, function() {
        console.log("Listening on " + port);
    });

});