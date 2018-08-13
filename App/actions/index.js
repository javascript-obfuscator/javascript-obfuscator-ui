import * as types from '../constants/ActionTypes';

export const updateCode = (code) => ({
    'type': types.UPDATE_CODE,
    code
});

export const obfuscateCode = (code, options) => {

    const body = {
        code,
        options
    };

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

};

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
