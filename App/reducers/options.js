import * as types from '../constants/ActionTypes';

import {SOURCEMAP_SEPARATE, SOURCEMAP_OFF} from '../containers/OptionsContainer';

const initialState = {
    compact: true,
    selfDefending: false,
    disableConsoleOutput: false,

    debugProtection: false,
    debugProtectionInterval: false,

    splitStrings: false,

    splitStringsChunkLength: 10,
    splitStringsChunkLengthEnabled: false,

    stringArray: true,

    rotateStringArray: true,
    rotateStringArrayEnabled: true,

    shuffleStringArray: true,
    shuffleStringArrayEnabled: true,

    stringArrayThreshold: 0.8,
    stringArrayThresholdEnabled: true,

    stringArrayEncoding: 'false',
    stringArrayEncodingEnabled: true,

    sourceMap: false,
    sourceMapMode: 'off',
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapSeparate: false,

    domainLock: [],
    domainLockEnabled: true,
    reservedNames: [],
    reservedStrings: [],

    seed: 0,

    controlFlowFlatteningThreshold: 0.75,
    controlFlowFlattening: false,

    deadCodeInjectionThreshold: 0.4,
    deadCodeInjection: false,

    unicodeEscapeSequence: false,

    renameGlobals: false,

    target: 'browser',

    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',

    transformObjectKeys: false,

};

export const options = (state = initialState, action) => {

    // this is necessary because new options need to be filled with their
    // default values and them merged with the state from the localStorage
    // which can be outdated when new options are added
    // from https://github.com/reactjs/redux/issues/433#issuecomment-129188687
    if (!state.hydrated) {
        state = {...initialState, ...state, hydrated: true};
    }

    switch (action.type) {

        case types.RESET_OPTIONS: {
            return initialState;
        }

        case types.TOGGLE_COMPACT_CODE: {
            const compact = !state.compact;
            return {
                ...state,
                compact,
                selfDefending: state.selfDefending && compact,
            };
        }

        case types.TOGGLE_SELF_DEFENDING: {
            const selfDefending = !state.selfDefending;
            return {
                ...state,
                selfDefending,
                compact: state.compact || selfDefending,
            };
        }

        case types.TOGGLE_DISABLE_CONSOLE_OUTPUT:
            return {
                ...state,
                disableConsoleOutput: !state.disableConsoleOutput,
            };

        case types.TOGGLE_DEBUG_PROTECTION: {
            const debugProtection = !state.debugProtection;
            return {
                ...state,
                debugProtection,
                debugProtectionInterval: state.debugProtectionInterval && debugProtection,
            }
        }

        case types.TOGGLE_DEBUG_PROTECTION_INTERVAL:
            return {
                ...state,
                debugProtectionInterval: !state.debugProtectionInterval,
            };

        case types.TOGGLE_SPLIT_STRINGS: {
            const splitStrings = !state.splitStrings;

            return {
                ...state,
                splitStrings,
                splitStringsChunkLengthEnabled: splitStrings,
            };
        }

        case types.SET_SPLIT_STRINGS_CHUNK_LENGTH:
            return {
                ...state,
                splitStringsChunkLength: action.chunkLength
            };

        case types.TOGGLE_STRING_ARRAY: {
            // Also change the TOGGLE_DEAD_CODE_INJECTION below if changed
            const stringArray = !state.stringArray;
            return {
                ...state,
                stringArray,
                rotateStringArrayEnabled: stringArray,
                shuffleStringArrayEnabled: stringArray,
                stringArrayThresholdEnabled: stringArray,
                stringArrayEncodingEnabled: stringArray,
            };
        }

        case types.TOGGLE_ROTATE_STRING_ARRAY:
            return {
                ...state,
                rotateStringArray: !state.rotateStringArray
            };

        case types.TOGGLE_SHUFFLE_STRING_ARRAY:
            return {
                ...state,
                shuffleStringArray: !state.shuffleStringArray
            };

        case types.SET_STRING_ARRAY_ENCODING:
            return {
                ...state,
                stringArrayEncoding: action.encoding
            };

        case types.SET_STRING_ARRAY_THRESHOLD:
            return {
                ...state,
                stringArrayThreshold: action.threshold
            };

        case types.SET_SOURCEMAP_MODE: {
            const mode = action.mode;
            return {
                ...state,
                sourceMap: mode !== SOURCEMAP_OFF,
                sourceMapMode: mode,
                sourceMapSeparate: mode === SOURCEMAP_SEPARATE
            };
        }

        case types.SET_SOURCEMAP_BASE_URL:
            return {
                ...state,
                sourceMapBaseUrl: action.baseUrl
            };

        case types.SET_SOURCEMAP_FILE_NAME:
            return {
                ...state,
                sourceMapFileName: action.fileName
            };

        case types.ADD_DOMAIN_LOCK: {
            const domain = action.domain;
            if (state.domainLock.indexOf(domain) !== -1)
                return state;

            return {
                ...state,
                domainLock: [...state.domainLock, domain],
            };
        }

        case types.REMOVE_DOMAIN_LOCK:
            return {
                ...state,
                domainLock: state.domainLock.filter((domain) => domain !== action.domain),
            };

        case types.ADD_RESERVED_NAME: {
            const name = action.name;
            if (state.reservedNames.indexOf(name) !== -1)
                return state;

            return {
                ...state,
                reservedNames: [...state.reservedNames, name],
            };
        }

        case types.REMOVE_RESERVED_NAME:
            return {
                ...state,
                reservedNames: state.reservedNames.filter((name) => name !== action.name),
            };

        case types.ADD_RESERVED_STRING: {
            const string = action.string;
            if (state.reservedStrings.indexOf(string) !== -1)
                return state;

            return {
                ...state,
                reservedStrings: [...state.reservedStrings, string],
            };
        }

        case types.REMOVE_RESERVED_STRING:
            return {
                ...state,
                reservedStrings: state.reservedStrings.filter((string) => string !== action.string),
            };

        case types.ADD_DICTIONARY_IDENTIFIER: {
            const name = action.name;

            return {
                ...state,
                identifiersDictionary: [...state.identifiersDictionary, name],
            };
        }

        case types.REMOVE_DICTIONARY_IDENTIFIER:
            return {
                ...state,
                identifiersDictionary: state.identifiersDictionary.filter((name) => name !== action.name),
            };

        case types.SET_SEED:
            return {
                ...state,
                seed: action.seed
            };

        case types.SET_CONTROL_FLOW_FLATTENING_THRESHOLD:
            return {
                ...state,
                controlFlowFlatteningThreshold: action.threshold
            };

        case types.TOGGLE_CONTROL_FLOW_FLATTENING:
            return {
                ...state,
                controlFlowFlattening: !state.controlFlowFlattening
            };

        case types.SET_DEAD_CODE_INJECTION_THRESHOLD:
            return {
                ...state,
                deadCodeInjectionThreshold: action.threshold
            };

        case types.TOGGLE_DEAD_CODE_INJECTION: {
            // Also change the TOGGLE_STRING_ARRAY above if changed
            const deadCodeInjection = !state.deadCodeInjection;
            const stringArray = state.stringArray || deadCodeInjection;
            return {
                ...state,
                deadCodeInjection: deadCodeInjection,
                stringArray,
                rotateStringArrayEnabled: stringArray,
                stringArrayThresholdEnabled: stringArray,
                stringArrayEncodingEnabled: stringArray
            };
        }

        case types.TOGGLE_UNICODE_ESCAPE_SEQUENCE:
            return {
                ...state,
                unicodeEscapeSequence: !state.unicodeEscapeSequence
            };

        case types.TOGGLE_RENAME_GLOBALS:
            return {
                ...state,
                renameGlobals: !state.renameGlobals
            };

        case types.SET_TARGET: {
            const target = action.target;

            const isNodeTarget = target === 'node';

            return {
                ...state,
                target,
                ...isNodeTarget && {
                    domainLock: []
                },
                domainLockEnabled: !isNodeTarget
            };
        }

        case types.SET_IDENTIFIER_NAMES_GENERATOR:
            return {
                ...state,
                identifierNamesGenerator: action.identifierNamesGenerator
            };

        case types.SET_IDENTIFIERS_PREFIX:
            return {
                ...state,
                identifiersPrefix: action.identifiersPrefix
            };

        case types.TOGGLE_TRANSFORM_OBJECT_KEYS:
            return {
                ...state,
                transformObjectKeys: !state.transformObjectKeys
            };

        default:
            return state
    }

};
