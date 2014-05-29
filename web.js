var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('logger');
var session = require('cookie-session');
var mongoose = require('mongoose');
var jade = require('jade');
var passport = require('passport');
var flash 	 = require('connect-flash');


var configDB = require('./config/database.js');

var app = express();

//var html = jade.renderFile('views/index.jade');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

// require('./config/passport')(passport); // pass passport for configuration

var env = process.env.NODE_ENV || 'development';

if ('development' == env) {

	// set up our express application
	//app.use(express.logger('dev')); // log every request to the console
	//app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

app.use(function (req, res, next) {
  console.log(req.body) // populated!
  next()
})
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade'); // set up ejs for templating

	// required for passport
	app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

}

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport



// Error 404

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Cannot find page!');
});

app.listen(8080);
