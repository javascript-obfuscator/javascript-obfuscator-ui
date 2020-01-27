self.window = self;

const JavaScriptObfuscator = require('javascript-obfuscator');

onmessage = function(event) {
    const {code, options} = event.data;

    let result;

    try {
        const obfuscationResult = JavaScriptObfuscator.obfuscate(code, options);

        result = {
            code: obfuscationResult.getObfuscatedCode(),
            sourceMap: obfuscationResult.getSourceMap(),
        }
    } catch (error) {
        result = {
            code: error.toString(),
            sourceMap: '',
        }
    }

    postMessage(JSON.stringify(result));
};