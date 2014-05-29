var express = require('express');

var jade = require('jade');

// DB connection

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

});


// Passport configuration

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


// App launch

var app = express();

app.set('view engine', 'jade');

var html = jade.renderFile('views/index.jade');

var userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

var User = mongoose.model('User', userSchema)

app.get('/', function(req, res) {
    res.end(html);
});

app.get('/signup', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Please sign up!');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Cannot find page!');
});

app.listen(8080);