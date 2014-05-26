var express = require('express');

var jade = require('jade');

var app = express();

app.set('view engine', 'jade');

var html = jade.renderFile('views/index.jade');

app.get('/', function(req, res) {
    res.end(html);
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