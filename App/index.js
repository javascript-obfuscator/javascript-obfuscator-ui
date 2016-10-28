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

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(...middleware)
);

// There's no need to throttle the saveState function because
// we don't change the state very often
store.subscribe(() => {
  saveState({
    options: store.getState().options
  });
})

render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);