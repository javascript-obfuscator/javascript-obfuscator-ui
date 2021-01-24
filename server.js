const express = require('express');
const bodyParser = require("body-parser");
const { spawn, Worker } = require('threads');

const app = express();

process.env.PWD = process.cwd();

(async function () {
    const obfuscationWorker = await spawn(new Worker('./workers/obfuscation-worker'));

    app.set('port', (process.env.PORT || 3000));

    app.use(bodyParser.json({limit: '3mb'}));

    app.use('/static/dist', express.static(__dirname + '/dist'));
    app.use('/workers', express.static(__dirname + '/dist/workers'));
    app.use('/static/images', express.static(__dirname + '/public/images'));
    app.use('/static/semantic', express.static(__dirname + '/public/semantic'));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/dist/index.html');
    });

    app.post('/obfuscate', function (req, res) {
        const body = req.body;

        const {code, options} = body;

        obfuscationWorker
            .obfuscate(code, options)
            .then(response => {
                res.send(JSON.stringify(response));
            })
            .catch(error => {
                res.send(JSON.stringify(error));
            });
    });

    app.listen(app.get('port'), function () {

    });
})();
