import * as types from '../constants/ActionTypes';

import {
    SOURCEMAP_SEPARATE,
    OPTIONS_PRESET_DEFAULT,
    IDENTIFIER_NAMES_GENERATOR_HEXADECIMAL,
    TARGET_BROWSER,
    STRING_ARRAY_ENCODING_NONE,
    STRING_ARRAY_ENCODING_BASE64,
    STRING_ARRAY_ENCODING_RC4,
    STRING_ARRAY_WRAPPERS_TYPE_VARIABLE,
    STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMBER,
    RENAME_PROPERTIES_MODE_SAFE,
    DOMAIN_LOCK_REDIRECT_URL_ABOUT_BLANK
} from '../containers/OptionsContainer';

const initialState = {
    optionsPreset: OPTIONS_PRESET_DEFAULT,

    compact: true,
    selfDefending: false,
    disableConsoleOutput: false,

    debugProtection: false,
    debugProtectionInterval: 0,

    splitStrings: false,

    splitStringsChunkLength: 10,
    splitStringsChunkLengthEnabled: false,

    stringArray: true,

    stringArrayRotate: true,
    stringArrayRotateEnabled: true,

    stringArrayShuffle: true,
    stringArrayShuffleEnabled: true,

    simplify: true,

    stringArrayThreshold: 0.75,
    stringArrayThresholdEnabled: true,

    stringArrayIndexesType: [
        STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMBER
    ],

    stringArrayIndexShift: true,

    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,

    stringArrayEncoding: [
        STRING_ARRAY_ENCODING_NONE
    ],
    stringArrayEncodingEnabled: true,

    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: STRING_ARRAY_WRAPPERS_TYPE_VARIABLE,

    numbersToExpressions: false,

    sourceMap: false,
    sourceMapMode: SOURCEMAP_SEPARATE,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',

    domainLock: [],
    domainLockRedirectUrl: DOMAIN_LOCK_REDIRECT_URL_ABOUT_BLANK,
    domainLockEnabled: true,

    forceTransformStrings: [],
    reservedNames: [],
    reservedStrings: [],

    seed: 0,

    controlFlowFlatteningThreshold: 0.75,
    controlFlowFlattening: false,

    deadCodeInjectionThreshold: 0.4,
    deadCodeInjection: false,

    unicodeEscapeSequence: false,

    renameGlobals: false,

    renameProperties: false,
    renamePropertiesMode: RENAME_PROPERTIES_MODE_SAFE,

    target: TARGET_BROWSER,

    identifierNamesGenerator: IDENTIFIER_NAMES_GENERATOR_HEXADECIMAL,
    identifiersDictionary: [],
    identifiersPrefix: '',

    transformObjectKeys: false,

    ignoreImports: false

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

        case types.SET_OPTIONS_PRESET: {
            return {
                ...state,
                ...action.options,
                optionsPreset: action.optionsPreset
            };
        }

        case types.TOGGLE_COMPACT_CODE: {
            const compact = !state.compact;
            return {
                ...state,
                compact,
                selfDefending: state.selfDefending && compact,
            };
        }

        case types.TOGGLE_SIMPLIFY: {
            return {
                ...state,
                simplify: !state.simplify,
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
                debugProtectionInterval: debugProtection
                    ? state.debugProtectionInterval
                    : initialState.debugProtectionInterval,
            }
        }

        case types.SET_DEBUG_PROTECTION_INTERVAL: {
            return {
                ...state,
                debugProtectionInterval: action.debugProtectionInterval
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
                stringArrayRotateEnabled: stringArray,
                stringArrayShuffleEnabled: stringArray,
                stringArrayThresholdEnabled: stringArray,
                stringArrayEncodingEnabled: stringArray,
            };
        }

        case types.TOGGLE_STRING_ARRAY_INDEX_SHIFT:
            return {
                ...state,
                stringArrayIndexShift: !state.stringArrayIndexShift
            };

        case types.TOGGLE_STRING_ARRAY_ROTATE:
            return {
                ...state,
                stringArrayRotate: !state.stringArrayRotate
            };

        case types.TOGGLE_STRING_ARRAY_SHUFFLE:
            return {
                ...state,
                stringArrayShuffle: !state.stringArrayShuffle
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

        case types.SET_STRING_ARRAY_INDEXES_TYPE:
            return {
                ...state,
                stringArrayIndexesType: action.indexesType
            };

        case types.SET_STRING_ARRAY_CALLS_TRANSFORM_THRESHOLD:
            return {
                ...state,
                stringArrayCallsTransformThreshold: action.threshold
            };

        case types.TOGGLE_STRING_ARRAY_CALLS_TRANSFORM:
            return {
                ...state,
                stringArrayCallsTransform: !state.stringArrayCallsTransform
            };

        case types.SET_STRING_ARRAY_WRAPPERS_COUNT:
            return {
                ...state,
                stringArrayWrappersCount: action.stringArrayWrappersCount
            };

        case types.SET_STRING_ARRAY_WRAPPERS_PARAMETERS_MAX_COUNT:
            return {
                ...state,
                stringArrayWrappersParametersMaxCount: action.stringArrayWrappersParametersMaxCount
            };

        case types.TOGGLE_STRING_ARRAY_WRAPPERS_CHAINED_CALLS:
            return {
                ...state,
                stringArrayWrappersChainedCalls: !state.stringArrayWrappersChainedCalls
            };

        case types.SET_STRING_ARRAY_WRAPPERS_TYPE:
            return {
                ...state,
                stringArrayWrappersType: action.stringArrayWrappersType
            };

        case types.TOGGLE_SOURCEMAP: {
            return {
                ...state,
                sourceMap: !state.sourceMap
            };
        }

        case types.SET_SOURCEMAP_MODE: {
            const mode = action.mode;
            return {
                ...state,
                sourceMapMode: mode
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

        case types.SET_DOMAIN_LOCK_REDIRECT_URL:
            return {
                ...state,
                domainLockRedirectUrl: action.domainLockRedirectUrl
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

        case types.ADD_FORCE_TRANSFORM_STRING: {
            const string = action.string;
            if (state.forceTransformStrings.indexOf(name) !== -1)
                return state;

            return {
                ...state,
                forceTransformStrings: [...state.forceTransformStrings, string],
            };
        }

        case types.REMOVE_FORCE_TRANSFORM_STRING: {
            return {
                ...state,
                forceTransformStrings: state.forceTransformStrings.filter((string) => string !== action.string)
            };
        }

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
                stringArrayRotateEnabled: stringArray,
                stringArrayThresholdEnabled: stringArray,
                stringArrayEncodingEnabled: stringArray
            };
        }

        case types.TOGGLE_NUMBERS_TO_EXPRESSIONS:
            return {
                ...state,
                numbersToExpressions: !state.numbersToExpressions
            };

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

        case types.TOGGLE_RENAME_PROPERTIES:
            return {
                ...state,
                renameProperties: !state.renameProperties
            };

        case types.SET_RENAME_PROPERTIES_MODE:
            return {
                ...state,
                renamePropertiesMode: action.renamePropertiesMode
            };

        case types.SET_TARGET: {
            const target = action.target;

            const isNodeTarget = target === 'node';

            return {
                ...state,
                target,
                ...isNodeTarget && {
                    domainLock: [],
                    domainLockRedirectUrl: DOMAIN_LOCK_REDIRECT_URL_ABOUT_BLANK
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

        case types.TOGGLE_IGNORE_IMPORTS:
            return {
                ...state,
                ignoreImports: !state.ignoreImports
            };

        default:
            return state
    }
};

export function sanitizePersistedOptions(persistedOptions) {
    if (typeof persistedOptions.debugProtectionInterval !== 'number') {
        persistedOptions.debugProtectionInterval = initialState.debugProtectionInterval;
    }

    if (!Array.isArray(persistedOptions.stringArrayEncoding)) {
        persistedOptions.stringArrayEncoding = initialState.stringArrayEncoding;
    } else {
        for (const value of persistedOptions.stringArrayEncoding) {
            if (
                value !== STRING_ARRAY_ENCODING_NONE
                || value !== STRING_ARRAY_ENCODING_BASE64
                || value !== STRING_ARRAY_ENCODING_RC4
            ) {
                persistedOptions.stringArrayEncoding = initialState.stringArrayEncoding;

                break;
            }
        }
    }
}
