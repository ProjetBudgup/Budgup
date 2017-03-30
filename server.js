
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cozydb = require('cozydb');

app.set('port', (process.env.PORT || 9250));
/*
    Configuration section.
*/
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('client'));


/*
    Define routes and their handler.
*/
var indexController = require('./server/controllers/index');
app.use(indexController);


var bankOperationController = require('./server/controllers/bankoperation');
app.use(bankOperationController);


/*
    Start the HTTP server.
*/
cozydb.configure(__dirname, null, function() {
var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Budgup app listening at http://%s:%s', host, port);
});
});
