import * as types from '../constants/ActionTypes';


const DEFAULT_CODE = [
    '// Paste your JavaScript code here',
    'function hi() {',
    '  console.log("Hello World!");',
    '}',
    'hi();',
].join('\n');

export const DEFAULT_OUTPUT_FILE_NAME = 'obfuscated.js';

const initialState = {
    code: DEFAULT_CODE,
    outputFileName: DEFAULT_OUTPUT_FILE_NAME,
    obfuscatedCode: '',
    sourceMap: '',
    obfuscating: false,
    obfuscated: false,
    error: false
};


export const code = (state = initialState, action) => {

    switch (action.type) {
        case types.UPDATE_CODE:
            return {
                ...state,
                obfuscated: false,
                error: false,
                obfuscatedCode: '',
                sourceMap: '',
                code: action.code
            };

        case types.OBFUSCATE_PENDING:
            return {
                ...state,
                obfuscating: true,
                obfuscated: false,
                error: false,
                obfuscatedCode: '',
                sourceMap: '',
            };

        case types.OBFUSCATE_REJECTED:
            return {
                ...state,
                obfuscating: false,
                obfuscated: false,
                error: true,
                obfuscatedCode: '',
                sourceMap: '',
            };

        case types.OBFUSCATE_FULFILLED:
            return {
                ...state,
                obfuscating: false,
                obfuscated: true,
                error: false,
                obfuscatedCode: action.payload.code,
                sourceMap: action.payload.sourceMap,
            };

        case types.UPDATE_OUTPUT_FILE_NAME:
            return {
                ...state,
                outputFileName: action.outputFileName
            };

        default:
            return state
    }

};
