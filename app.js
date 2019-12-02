const express = require('express');
const app = express();

//application configuration details
const config = require('./config');

/**
Mongo DB connections
 */
const MongoClient = require('mongodb').MongoClient

//show
const findFamilies = function(db) {
  db.collection('families').find().toArray(function (err, result) {
    if (err) throw err
    //SpeechRecognitionResultList.
    //console.log(result)
    result.forEach(element => {
      console.log(element.children);
    });
  })
}

//insert
const insertDocument = function(db) {
  db.collection('families').insertOne( {
          "id": "AndersenFamily",
          "lastName": "Andersen",
          "parents": [
              { "firstName": "Thomas" },
              { "firstName": "Mary Kay" }
          ],
          "children": [
              { "firstName": "John", "gender": "male", "grade": 7 }
          ],
          "pets": [
              { "givenName": "Fluffy" }
          ],
          "address": { "country": "USA", "state": "WA", "city": "Seattle" }
      }, function(err, result) {
      //assert.equal(err, null);
      console.log("Inserted a document into the families collection.");
  });
  };

  const insertDocument2 = function(db) {
    db.collection('families').insertOne( {
            "id": "Stam",
            "lastName": "Stamer",
            "address": { "country": "Russia", "state": "Kaliningradskaya Oblast", "city": "Kaliningrad" }
        }, function(err, result) {
        //assert.equal(err, null);
        console.log("Inserted a document into the families collection.");
    });
    };

//Mongo action
MongoClient.connect(config.mongo_url, function (err, client) {
  if (err) throw err
  const db = client.db('familiesdb');

  //insertDocument(db);
  //insertDocument2(db);
  //findFamilies(db);
});

/**
 * templating view engine
 */ 
app.set('view engine', 'ejs');


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

//Files declarations
//routes - files
const login = require('./routes/login');
const budget = require('./routes/budget');

//routes
app.use('/', login);
app.use('/budget', budget);


const port = process.env.PORT || 3100;

app.listen(port, function(){
	console.log('Server running at port ' + port + ' : http://127.0.0.1:' + port);
});