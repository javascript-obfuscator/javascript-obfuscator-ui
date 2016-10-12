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
  ofbuscatedCode: '',
}


export const code = (state = initialState, action) => {

  switch (action.type) {

    case types.UPDATE_CODE:
      return {
        ...state,
        code: action.code
      }

    default:
      return state
  }

}
