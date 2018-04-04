const express = require('express');
const bodyParser = require("body-parser");

const JavaScriptObfuscator = require('javascript-obfuscator');

const app = express();

process.env.PWD = process.cwd();


app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json({limit: '3mb'}));

app.use('/static/dist', express.static(__dirname + '/dist'));
app.use('/static/images', express.static(__dirname + '/public/images'));
app.use('/static/semantic', express.static(__dirname + '/public/semantic'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/templates/index.html');
});

app.post('/obfuscate', function (req, res) {
    const body = req.body;

    const {code, options} = body;

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

    res.send(JSON.stringify(response));

});

app.listen(app.get('port'), function () {

});
