import React from 'react';

import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers'

import App from './containers/App'

import "./styles/semantic.less";

const middleware = [thunk, promiseMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);