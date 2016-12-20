var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:true});
var PORT_TO_USE = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(PORT_TO_USE, function(){
  console.log('Listening on port ' + PORT_TO_USE + '.');
});

app.post('/add', urlEncodedParser, function(req, res){
  console.log('/add url hit');
  console.log('Numbers to use: ' + req.body.num1 + ', ' + req.body.num2);
  var solution = Number(req.body.num1) + Number(req.body.num2);
  res.send({result: solution});
});

app.post('/subtract', urlEncodedParser, function(req, res){
  console.log('/subtract url hit');
  console.log('Numbers to use: ' + req.body.num1 + ', ' + req.body.num2);
  var solution = Number(req.body.num1) - Number(req.body.num2);
  res.send({result: solution});
});

app.post('/multiply', urlEncodedParser, function(req, res){
  console.log('/multiply url hit');
  console.log('Numbers to use: ' + req.body.num1 + ', ' + req.body.num2);
  var solution = Number(req.body.num1) * Number(req.body.num2);
  res.send({result: solution});
});

app.post('/divide', urlEncodedParser, function(req, res){
  console.log('/divide url hit');
  console.log('Numbers to use: ' + req.body.num1 + ', ' + req.body.num2);
  var solution = Number(req.body.num1) / Number(req.body.num2);
  res.send({result: solution});
});
