self.window = self;

const JavaScriptObfuscator = require('javascript-obfuscator');

onmessage = function(event) {
    const {type, payload} = event.data;

    switch (type) {
        case 'OBFUSCATOR_WORKER_OBFUSCATE_EVENT':
            onObfuscateEvent(payload);

            break;

        case 'OBFUSCATOR_WORKER_GET_OPTIONS_BY_PRESET_EVENT':
            onGetOptionsByPresetEvent(payload);

            break;

        default:
            throw new Error('Unknown obfuscator worker event');
    }
};

/**
 * @param payload
 */
function onObfuscateEvent(payload) {
    const {code, options} = payload;

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
}

/**
 * @param payload
 */
function onGetOptionsByPresetEvent(payload) {
    const {optionsPreset} = payload;

    const options = JavaScriptObfuscator.getOptionsByPreset(optionsPreset);

    postMessage(JSON.stringify(options));
}
