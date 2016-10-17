import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';

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


class _App extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func,
    code: React.PropTypes.string,
    obfuscatedCode: React.PropTypes.string,
    obfuscating: React.PropTypes.bool,
    obfuscated: React.PropTypes.bool,
    error: React.PropTypes.bool,
  }

  obfuscate() {
    const { dispatch } = this.props;
    const { code } = this.props;
    dispatch(actions.obfuscateCode(code));
  }

  render() {

    const { dispatch } = this.props;

    const {
      code,
      obfuscatedCode,
      obfuscating,
      obfuscated,
      error,
    } = this.props;

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

const mapStateToProps = (state) => {
  const code = state.code;
  return {
    code: code.code,
    obfuscatedCode: code.obfuscateCode,
    obfuscating: code.obfuscating,
    obfuscated: code.obfuscated,
    error: code.error,
  }
}

const App = connect(mapStateToProps)(_App);

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
