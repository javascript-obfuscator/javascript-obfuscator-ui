const expose = require('threads/worker').expose;
const JavaScriptObfuscator = require('javascript-obfuscator');

expose({
    obfuscate: (code, options) => {
        if (!options.sourceMap) {
            delete options.sourceMapMode
        }

        // options.stringArrayEncoding come from the client as strings, but the
        // obfuscator expects it to be a boolean or a string if 'base64'/'rc4'
        if (['false', 'true'].indexOf(options.stringArrayEncoding) !== -1) {
            options.stringArrayEncoding = options.stringArrayEncoding === 'true';
        }

        try {
            const result = JavaScriptObfuscator.obfuscate(code, options);

            return {
                code: result.getObfuscatedCode(),
                sourceMap: result.getSourceMap(),
            }
        } catch (e) {
            return {
                code: e.toString(),
                sourceMap: '',
            }
        }
    }
});