import React from 'react';

import {createStore, applyMiddleware} from 'redux'
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware';

import {loadState, saveState} from './localStorage';

import reducer from './reducers'

import App from './containers/App'

import "./styles/main.less";
import {sanitizePersistedOptions} from "./reducers/options";


const middleware = [thunk, promise];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

const persistedState = loadState();

/*
  `options.hydrated` should not be in the localStorage, but was saved there previously. Now we need to delete it here because some users will have it on
  their localStorage.
*/
if (persistedState !== undefined) {
    delete persistedState.options.hydrated;

    sanitizePersistedOptions(persistedState.options);
}

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
});

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);