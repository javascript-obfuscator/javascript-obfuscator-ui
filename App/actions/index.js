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

}

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

export const setUnicodeArrayThreshold = (threshold) => ({
  'type': types.SET_UNICODE_ARRAY_THRESHOLD,
  threshold
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
