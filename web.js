var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to AllKorea!');
});

app.get('/signup', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Please sign up!');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Cannot find page!');
});

app.listen(8080);