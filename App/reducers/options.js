import * as types from '../constants/ActionTypes';

import { SOURCEMAP_SEPARATE, SOURCEMAP_OFF } from '../containers/OptionsContainer'

const initialState = {
  compact: true,
  selfDefending: false,
  disableConsoleOutput: false,

  debugProtection: false,
  debugProtectionInterval: false,

  stringArray: true,

  rotateStringArray: true,
  rotateStringArrayEnabled: true,

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
  reservedNames: [],

  seed: 0,
}

export const options = (state = initialState, action) => {

  switch (action.type) {

    case types.TOGGLE_COMPACT_CODE:
      const compact = !state.compact;
      return {
        ...state,
        compact,
        selfDefending: state.selfDefending && compact,
      }

    case types.TOGGLE_SELF_DEFENDING:
      const selfDefending = !state.selfDefending;
      return {
        ...state,
        selfDefending,
        compact: state.compact || selfDefending,
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

    case types.TOGGLE_STRING_ARRAY:
      const stringArray = !state.stringArray;
      return {
        ...state,
        stringArray,
        rotateStringArrayEnabled: stringArray,
        stringArrayThresholdEnabled: stringArray,
        stringArrayEncodingEnabled: stringArray,
      }

    case types.TOGGLE_ROTATE_STRING_ARRAY:
      return {
        ...state,
        rotateStringArray: !state.rotateStringArray
      }

    case types.SET_STRING_ARRAY_ENCODING:
      return {
        ...state,
        stringArrayEncoding: action.encoding
      }

    case types.SET_STRING_ARRAY_THRESHOLD:
      return {
        ...state,
        stringArrayThreshold: action.threshold
      }

    case types.SET_SOURCEMAP_MODE:
      const mode = action.mode;
      return {
        ...state,
        sourceMap: mode !== SOURCEMAP_OFF,
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
        sourceMapFileName: action.fileName
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

    case types.SET_SEED:
      return {
        ...state,
        seed: action.seed
      }

    default:
      return state
  }

}
