import * as types from '../constants/ActionTypes';
import {OPTIONS_PRESET_DEFAULT} from "../containers/OptionsContainer";

const obfuscationWorker = new Worker('../workers/obfuscation-worker.js?v=' + new Date().getTime());

export const OBFUSCATOR_WORKER_OBFUSCATE_EVENT = 'OBFUSCATOR_WORKER_OBFUSCATE_EVENT';
export const OBFUSCATOR_WORKER_GET_OPTIONS_BY_PRESET_EVENT = 'OBFUSCATOR_WORKER_GET_OPTIONS_BY_PRESET_EVENT';

export const updateCode = (code) => ({
    'type': types.UPDATE_CODE,
    code
});

export const updateOutputFileName = (outputFileName) => ({
    'type': types.UPDATE_OUTPUT_FILE_NAME,
    outputFileName
});

export const obfuscateCode = (code, options) => {
    return (dispatch) => {
        if (!options.sourceMap) {
            delete options.sourceMapMode
        }

        // options.stringArrayEncoding come from the client as strings, but the
        // obfuscator expects it to be a boolean or a string if 'base64'/'rc4'
        if (['false', 'true'].indexOf(options.stringArrayEncoding) !== -1) {
            options.stringArrayEncoding = options.stringArrayEncoding === 'true';
        }

        const message = {
            type: OBFUSCATOR_WORKER_OBFUSCATE_EVENT,
            payload: {
                code,
                options
            }
        };

        obfuscationWorker.postMessage(message);

        dispatch({
            type: types.OBFUSCATE,
            payload: new Promise((resolve) => {
                obfuscationWorker.onmessage = function (event) {
                    const result = JSON.parse(event.data);

                    resolve(result);
                };
            })
        });
    };
};

export const resetOptions = () => {
    return (dispatch) => {
        dispatch({
            'type': types.RESET_OPTIONS,
        });
        dispatch(setOptionsPreset(OPTIONS_PRESET_DEFAULT));
    };
};

export const setOptionsPreset = (optionsPreset) => {
    return (dispatch) => {
        const message = {
            type: OBFUSCATOR_WORKER_GET_OPTIONS_BY_PRESET_EVENT,
            payload: { optionsPreset }
        };

        obfuscationWorker.postMessage(message);
        obfuscationWorker.onmessage = function (event) {
            const options = JSON.parse(event.data);

            dispatch({
                type: types.SET_OPTIONS_PRESET,
                optionsPreset,
                options
            });
        };
    };
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

export const setDomainLockRedirectUrl = (domainLockRedirectUrl) => ({
    'type': types.SET_DOMAIN_LOCK_REDIRECT_URL,
    domainLockRedirectUrl
});
export const addReservedName = (name) => ({
    'type': types.ADD_RESERVED_NAME,
    name
});

export const removeReservedName = (name) => ({
    'type': types.REMOVE_RESERVED_NAME,
    name
});

export const addForceTransformString = (string) => ({
    'type': types.ADD_FORCE_TRANSFORM_STRING,
    string
});

export const removeForceTransformString = (string) => ({
    'type': types.REMOVE_FORCE_TRANSFORM_STRING,
    string
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

export const setRenamePropertiesMode = (renamePropertiesMode) => ({
    'type': types.SET_RENAME_PROPERTIES_MODE,
    renamePropertiesMode
});

export const setSplitStringsChunkLength = (chunkLength) => ({
    'type': types.SET_SPLIT_STRINGS_CHUNK_LENGTH,
    chunkLength
});

export const setStringArrayThreshold = (threshold) => ({
    'type': types.SET_STRING_ARRAY_THRESHOLD,
    threshold
});

export const setStringArrayIndexesType = (indexesType) => ({
    'type': types.SET_STRING_ARRAY_INDEXES_TYPE,
    indexesType
});

export const setStringArrayCallsTransformThreshold = (threshold) => ({
    'type': types.SET_STRING_ARRAY_CALLS_TRANSFORM_THRESHOLD,
    threshold
});

export const setStringArrayEncoding = (encoding) => ({
    'type': types.SET_STRING_ARRAY_ENCODING,
    encoding
});

export const setStringArrayWrappersCount = (stringArrayWrappersCount) => ({
    'type': types.SET_STRING_ARRAY_WRAPPERS_COUNT,
    stringArrayWrappersCount
});

export const setStringArrayWrappersParametersMaxCount = (stringArrayWrappersParametersMaxCount) => ({
    'type': types.SET_STRING_ARRAY_WRAPPERS_PARAMETERS_MAX_COUNT,
    stringArrayWrappersParametersMaxCount
});

export const setStringArrayWrappersType = (stringArrayWrappersType) => ({
    'type': types.SET_STRING_ARRAY_WRAPPERS_TYPE,
    stringArrayWrappersType
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

export const setDebugProtectionInterval = (debugProtectionInterval) => ({
    'type': types.SET_DEBUG_PROTECTION_INTERVAL,
    debugProtectionInterval
});
