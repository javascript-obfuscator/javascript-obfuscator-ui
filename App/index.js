import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

import { loadState, saveState } from './localStorage';

import reducer from './reducers'

import App from './containers/App'

import "./styles/main.less";


const middleware = [thunk, promiseMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const persistedState = loadState();

// should not be in the localState, but was saved there by a bug
// now we need this here because some users will have this on their localState.
delete persistedState.options.hydrated;

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(...middleware)
);

// There's no need to throttle the saveState function because
// we don't change the state very often
store.subscribe(() => {
  const options = store.getState().options;
  delete options.hydrated;
  saveState({
    options,
  });
})

render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);