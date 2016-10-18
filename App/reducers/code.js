import * as types from '../constants/ActionTypes';


const DEFAULT_CODE = [
  '// Paste your Javascript code here',
  'function hi() {',
  ' console.log("Hello World!");',
  '}',
  'hi();',
].join('\n');


const initialState = {
  code: DEFAULT_CODE,
  obfuscatedCode: '',
  obfuscating: false,
  obfuscated: false,
  error: false,
}


export const code = (state = initialState, action) => {

  switch (action.type) {

    case types.UPDATE_CODE:
      return {
        ...state,
        obfuscated: false,
        error: false,
        obfuscatedCode: '',
        code: action.code
      }

    case types.OBFUSCATE_PENDING:
      return {
        ...state,
        obfuscating: true,
        obfuscated: false,
        error: false,
        obfuscatedCode: '',
      }

    case types.OBFUSCATE_REJECTED:
      return {
        ...state,
        obfuscating: false,
        obfuscated: false,
        error: true,
        obfuscatedCode: '',
      }

    case types.OBFUSCATE_FULFILLED:
      return {
        ...state,
        obfuscating: false,
        obfuscated: true,
        error: false,
        obfuscatedCode: action.payload.code
      }

    default:
      return state
  }

}
