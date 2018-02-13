var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items', function (err) {
    if (err) throw err;
    console.log('Successfully connected');
});


var userSchema = mongoose.Schema({ // модель записи в bd
    title: String,
    content: String,
    status: String
});

var Items = mongoose.model("Items", userSchema);


// не забыть закинуть монго в package

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


//вывод страници нового item
app.get("/write", function (req, res) {
    res.render("write.ejs")
});


//сохранение нового item в базу/ redirect
app.post("/write", function (req, res) {
    var title = req.body.title;
    var content = req.body.content;

    Items.create({title: title, content: content}, function (err) {
        if (err) return console.log(err);
        console.log("Сохранен объект item");
    });

    res.redirect('/');
});


//удление item из базы
app.get("/remove/:id", function (req, res) {

    var id = req.params.id;

    Items.deleteOne({_id: id}, function (err) {
        if (err) return console.log(err);
        console.log("Removed");
    });

    res.redirect('/');
});



app.get("/edit/:id", function (req, res) {

    var id = req.params.id;

    Items.findOne({_id: id}, function (err, result) {
        if (!err) {
            res.render('edit.ejs', {result: result});
        }
    });


});


app.post("/saveEdited/:id", function (req, res) {

    var id = req.params.id;

    var title = req.body.title;
    var content = req.body.content;

    var query = {_id: id};

    var newValues = {$set: {title: title, content: content}};

    Items.updateOne(query, newValues, function (err) {
        if (err) throw err;
    });

    res.redirect('/');

});



MongoClient.connect('mongodb://localhost:27017/app', function (err) {

    if (err){
        return console.log(err)
    }

    app.listen( 3000, function () {   // проект не стартует пока нет подключения к db
        console.log("Working on port 3000")
    });
});