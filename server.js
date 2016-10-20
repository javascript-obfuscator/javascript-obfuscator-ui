var express = require('express');
var bodyParser = require("body-parser");

var JavaScriptObfuscator = require('javascript-obfuscator');

var app = express();


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json({limit: '5mb'}));

app.use('/static', express.static(__dirname + '/public'));
app.use('/static/dist', express.static(__dirname + '/dist'));
app.use('/static/semantic', express.static(__dirname + '/public/semantic'));
app.use('/static/styles', express.static(__dirname + '/App/styles'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/templates/index.html');
});

// function sleep(time) {
//     var stop = new Date().getTime();
//     while(new Date().getTime() < stop + time);
// }

app.post('/obfuscate', function (req, res) {
  const body = req.body;

  const { code, options } = body;

  if (!options.sourceMap) {
    delete options.sourceMapMode
  }

  const result = JavaScriptObfuscator.obfuscate(code, options);

  // sleep(2000);

  const response = {
    code: result.getObfuscatedCode(),
    sourceMap: result.getSourceMap(),
  }

  res.send(JSON.stringify(response));

});

app.listen(app.get('port'), function () {
});
