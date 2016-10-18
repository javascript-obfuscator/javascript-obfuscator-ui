import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../actions';

import CodeContainer from './CodeContainer';
import OptionsContainer from './OptionsContainer';


class App extends Component {

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

export default connect(mapStateToProps)(App);