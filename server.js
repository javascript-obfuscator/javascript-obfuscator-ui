var express = require('express');
var bodyParser = require("body-parser");

var JavaScriptObfuscator = require('javascript-obfuscator');

var app = express();

process.env.PWD = process.cwd();


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json({limit: '3mb'}));

app.use('/static/dist', express.static(__dirname + '/dist'));
app.use('/static/semantic', express.static(__dirname + '/public/semantic'));

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

  // options.stringArrayEncoding come from the client as strings, but the
  // obfuscator expects it to be a boolean or a string if 'base64'/'rc4'
  if (['false', 'true'].indexOf(options.stringArrayEncoding) !== -1) {
    options.stringArrayEncoding = options.stringArrayEncoding === 'true';
  }

  let response = {};

  try {
    const result = JavaScriptObfuscator.obfuscate(code, options);
    response = {
      code: result.getObfuscatedCode(),
      sourceMap: result.getSourceMap(),
    }
  } catch (e) {
    response = {
      code: e.toString(),
      sourceMap: '',
    }
  }

  // sleep(2000);


  res.send(JSON.stringify(response));

});

app.listen(app.get('port'), function () {
});
