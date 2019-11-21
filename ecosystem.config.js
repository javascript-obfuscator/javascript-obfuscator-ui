const {resolve} = require('path');

module.exports = {
    apps : [{
        name: 'javascript-obfuscator-ui',
        script: resolve(__dirname, './server'),
        instances: 1,
        merge_logs: true,
        out_file: '/var/log/javascript-obfuscator-ui/app.log',
        error_file: '/var/log/javascript-obfuscator-ui/error.log',
    }]
};
