const express = require('express');
const app = express();

/**
Mongo DB connections
 */
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://0d5442d5-0ee0-4-231-b9ee:GEOqpmMz7gADvEZ8I34lLyL3jLhmLQNpR07f8jowY2wKp5BxFz61f3WNuG3Q9nbo281oGmYzZ5R2oCp3M7dfUQ%3D%3D@0d5442d5-0ee0-4-231-b9ee.documents.azure.com:10255/?ssl=true', function (err, db) {
  if (err) throw err

  /* db.collection('families').find().toArray(function (err, result) {
    if (err) throw err
    console.log(result)
  }) */



});

/**
 * templating view engine
 */ 
app.set('view engine', 'ejs');

//routes
//const index = require('./routes/index');

//test route
app.get('/api', function(req, res, next){
    res.json({ "message": 'response from API endpoint' });
});

/**
 * body-parser module is used to read HTTP POST data
 */ 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*  setting up cookies and session modules  */
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser('keyboard cat'));
app.use(session({ 
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
    cookie: { //maxAge: 600000
     }
}));

//static files - css,js
app.use(express.static('public'));

//routes
//app.use('/', index);



const port = process.env.PORT || 3100;

app.listen(port, function(){
	console.log('Server running at port ' + port + ' : http://127.0.0.1:' + port);
});