const expose = require('threads/worker').expose;
const JavaScriptObfuscator = require('javascript-obfuscator');

expose({
    obfuscate: (code, options) => {
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