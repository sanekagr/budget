const express = require('express');
const app = express();

/**
MySQL connections
 */
const mysql = require('mysql');

const myConnection  = require('express-myconnection');
/**
 * database credentials in a separate config.js file
 */ 
const config = require('./config');

/* const dbOptions = {
	host:	  config.database.host,
	user: 	  config.database.user,
	password: config.database.password,
	port: 	  config.database.port, 
	database: config.database.db
}
 */
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * ---------------------------------------------------------------------------------
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * ---------------------------------------------------------------------------------
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
//app.use(myConnection(mysql, dbOptions, 'pool'));

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