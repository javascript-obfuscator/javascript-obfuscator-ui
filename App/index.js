import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

import * as actions from './actions';

import CodeContainer from './containers/CodeContainer';
import OptionsContainer from './containers/OptionsContainer';


const middleware = [thunk, promiseMiddleware()];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(...middleware));


class App extends Component {

  static contextTypes = {
    store: React.PropTypes.object
  };

  obfuscate() {
    const code = this.context.store.getState().code.code;

    const { dispatch } = this.context.store;

    dispatch(actions.obfuscateCode(code));

  }

  render() {

    const { dispatch } = this.context.store;

    const {
      code,
      obfuscatedCode,
      obfuscating,
      obfuscated,
      error,
    } = this.context.store.getState().code;

    return (
      <div>

        <CodeContainer
          code={code}
          obfuscatedCode={obfuscatedCode}
          pending={obfuscating}
          hasResults={obfuscated || error }
          onCodeChange={(code) => dispatch(actions.updateCode(code))}
          onObfuscateClick={() => this.obfuscate()}
         />

        <div className="ui grid">
          <div className="column">
            <OptionsContainer />
          </div>
        </div>

      </div>
    );
  }

}


const _render = () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
    ,
    document.getElementById('main')
  );
}

_render();

store.subscribe(_render);
