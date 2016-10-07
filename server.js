var express = require('express');
var bodyParser = require("body-parser");

var JavaScriptObfuscator = require('javascript-obfuscator');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));
app.use('/static/dist', express.static(__dirname + '/dist'));
app.use('/static/semantic', express.static(__dirname + '/semantic/dist'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/obfuscate', function (req, res) {
  const body = req.body;

  const {code} = body;

  const result = JavaScriptObfuscator.obfuscate(code);

  const response = {
    code: result.getObfuscatedCode(),
  }

  res.send(JSON.stringify(response));

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
