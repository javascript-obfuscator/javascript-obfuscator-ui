import * as types from '../constants/ActionTypes';

const obfuscationWorker = new Worker('../workers/obfuscation-worker.js');

export const updateCode = (code) => ({
    'type': types.UPDATE_CODE,
    code
});

export const obfuscateCode = (code, options) => {
    return (dispatch) => {
        const message = {
            code,
            options
        };

        if (!options.sourceMap) {
            delete options.sourceMapMode
        }

        // options.stringArrayEncoding come from the client as strings, but the
        // obfuscator expects it to be a boolean or a string if 'base64'/'rc4'
        if (['false', 'true'].indexOf(options.stringArrayEncoding) !== -1) {
            options.stringArrayEncoding = options.stringArrayEncoding === 'true';
        }

        obfuscationWorker.postMessage(message);

        dispatch({
            type: types.OBFUSCATE,
            payload: new Promise((resolve) => {
                obfuscationWorker.onmessage = function (event) {
                    const result = JSON.parse(event.data);

                    resolve(result);
                };
            }),
        });

        /**
        const request = new Request('/obfuscate', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        return {
            type: types.OBFUSCATE,
            payload: fetch(request).then((response) => response.json()),
        }
        */
    };
};

export const resetOptions = () => ({
    'type': types.RESET_OPTIONS,
});

export const toggleOption = (optionType) => ({
    'type': optionType
});

export const addDomainLock = (domain) => ({
    'type': types.ADD_DOMAIN_LOCK,
    domain
});

export const removeDomainLock = (domain) => ({
    'type': types.REMOVE_DOMAIN_LOCK,
    domain
});

export const addReservedName = (name) => ({
    'type': types.ADD_RESERVED_NAME,
    name
});

export const removeReservedName = (name) => ({
    'type': types.REMOVE_RESERVED_NAME,
    name
});

export const addReservedString = (string) => ({
    'type': types.ADD_RESERVED_STRING,
    string
});

export const removeReservedString = (string) => ({
    'type': types.REMOVE_RESERVED_STRING,
    string
});

export const addDictionaryIdentifier = (name) => ({
    'type': types.ADD_DICTIONARY_IDENTIFIER,
    name
});

export const removeDictionaryIdentifier = (name) => ({
    'type': types.REMOVE_DICTIONARY_IDENTIFIER,
    name
});

export const setSplitStringsChunkLength = (chunkLength) => ({
    'type': types.SET_SPLIT_STRINGS_CHUNK_LENGTH,
    chunkLength
});

export const setStringArrayThreshold = (threshold) => ({
    'type': types.SET_STRING_ARRAY_THRESHOLD,
    threshold
});

export const setStringArrayEncoding = (encoding) => ({
    'type': types.SET_STRING_ARRAY_ENCODING,
    encoding
});

export const setSourceMapMode = (mode) => ({
    'type': types.SET_SOURCEMAP_MODE,
    mode
});

export const setSourceMapBaseUrl = (baseUrl) => ({
    'type': types.SET_SOURCEMAP_BASE_URL,
    baseUrl
});

export const setSourceMapFileName = (fileName) => ({
    'type': types.SET_SOURCEMAP_FILE_NAME,
    fileName
});

export const setSeed = (seed) => ({
    'type': types.SET_SEED,
    seed
});

export const setControlFlowFlatteningThreshold = (threshold) => ({
    'type': types.SET_CONTROL_FLOW_FLATTENING_THRESHOLD,
    threshold
});

export const setDeadCodeInjectionThreshold = (threshold) => ({
    'type': types.SET_DEAD_CODE_INJECTION_THRESHOLD,
    threshold
});

export const setTarget = (target) => ({
    'type': types.SET_TARGET,
    target
});

export const setIdentifierNamesGenerator = (identifierNamesGenerator) => ({
    'type': types.SET_IDENTIFIER_NAMES_GENERATOR,
    identifierNamesGenerator
});

export const setIdentifiersPrefix = (identifiersPrefix) => ({
    'type': types.SET_IDENTIFIERS_PREFIX,
    identifiersPrefix
});
