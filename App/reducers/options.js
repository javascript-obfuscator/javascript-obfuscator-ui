import * as types from '../constants/ActionTypes';
import {SOURCEMAP_SEPARATE} from '../containers/Options'

const initialState = {
  compactCode: true,
  selfDefending: true,
  disableConsoleOutput: false,

  debugProtection: false,
  debugProtectionInterval: false,

  unicodeArray: true,

  rotateUnicodeArray: true,
  rotateUnicodeArrayEnabled: true,

  unicodeArrayThreshold: 0.8,
  unicodeArrayThresholdEnabled: true,

  wrapUnicodeArrayCalls: true,
  wrapUnicodeArrayCallsEnabled: true,

  encodeUnicodeLiterals: false,
  encodeUnicodeLiteralsEnabled: true,

  sourceMapMode: 'off',
  sourceMapBaseUrl: 'http://',
  sourceMapFileName: '',
  sourceMapSeparate: false,

  domainLock: [],
  reservedNames: [],
}

export const options = (state = initialState, action) => {

  switch (action.type) {

    case types.TOGGLE_COMPACT_CODE:
      const compactCode = !state.compactCode;
      return {
        ...state,
        compactCode,
        selfDefending: state.selfDefending && compactCode,
      }

    case types.TOGGLE_SELF_DEFENDING:
      const selfDefending = !state.selfDefending;
      return {
        ...state,
        selfDefending,
        compactCode: state.compactCode || selfDefending,
      }

    case types.TOGGLE_DISABLE_CONSOLE_OUTPUT:
      return {
        ...state,
        disableConsoleOutput: !state.disableConsoleOutput,
      }

    case types.TOGGLE_DEBUG_PROTECTION:
      const debugProtection = !state.debugProtection;
      return {
        ...state,
        debugProtection,
        debugProtectionInterval: state.debugProtectionInterval && debugProtection,
      }

    case types.TOGGLE_DEBUG_PROTECTION_INTERVAL:
      return {
        ...state,
        debugProtectionInterval: !state.debugProtectionInterval,
      }

    case types.TOGGLE_COMPACT_CODE:
      return {
        ...state,
        compactCode: !state.compactCode
      }

    case types.TOGGLE_UNICODE_ARRAY:
      const unicodeArray = !state.unicodeArray;
      return {
        ...state,
        unicodeArray,
        rotateUnicodeArrayEnabled: unicodeArray,
        unicodeArrayThresholdEnabled: unicodeArray,
        wrapUnicodeArrayCallsEnabled: unicodeArray,
        encodeUnicodeLiteralsEnabled: unicodeArray,
      }

    case types.TOGGLE_ROTATE_UNICODE_ARRAY:
      return {
        ...state,
        rotateUnicodeArray: !state.rotateUnicodeArray
      }

    case types.TOGGLE_WRAP_UNICODE_ARRAY_CALLS:
      return {
        ...state,
        wrapUnicodeArrayCalls: !state.wrapUnicodeArrayCalls
      }

    case types.TOGGLE_ENCODE_UNICODE_LITERALS:
      return {
        ...state,
        encodeUnicodeLiterals: !state.encodeUnicodeLiterals
      }

    case types.SET_UNICODE_ARRAY_THRESHOLD:
      return {
        ...state,
        unicodeArrayThreshold: action.threshold
      }

    case types.SET_SOURCEMAP_MODE:
      const mode = action.mode;
      return {
        ...state,
        sourceMapMode: mode,
        sourceMapSeparate: mode === SOURCEMAP_SEPARATE
      }

    case types.SET_SOURCEMAP_BASE_URL:
      return {
        ...state,
        sourceMapBaseUrl: action.baseUrl
      }

    case types.SET_SOURCEMAP_FILE_NAME:
      return {
        ...state,
        sourMapFileName: action.fileName
      }

    case types.ADD_DOMAIN_LOCK:
      const domain = action.domain;
      if (state.domainLock.indexOf(domain) !== -1)
        return state;

      return {
        ...state,
        domainLock: [...state.domainLock, domain],
      }

    case types.REMOVE_DOMAIN_LOCK:
      return {
        ...state,
        domainLock: state.domainLock.filter((domain) => domain !== action.domain),
      }

    case types.ADD_RESERVED_NAME:
      const name = action.name;
      if (state.reservedNames.indexOf(name) !== -1)
        return state;

      return {
        ...state,
        reservedNames: [...state.reservedNames, name],
      }

    case types.REMOVE_RESERVED_NAME:
      return {
        ...state,
        reservedNames: state.reservedNames.filter((name) => name !== action.name),
      }

    default:
      return state
  }

}
