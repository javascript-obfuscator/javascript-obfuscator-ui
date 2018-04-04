import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {downloadFile} from '../util/downloadFile';

import * as actions from '../actions';

import CodeContainer from './CodeContainer';
import OptionsContainer from './OptionsContainer';

class App extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        code: PropTypes.string,
        obfuscatedCode: PropTypes.string,
        sourceMap: PropTypes.string,
        obfuscating: PropTypes.bool,
        obfuscated: PropTypes.bool,
        error: PropTypes.bool,
        options: PropTypes.object,
    };

    obfuscate() {
        const {dispatch} = this.props;
        const {code, options} = this.props;
        dispatch(actions.obfuscateCode(code, options));
    }

    downloadCode() {
        const data = {
            mime: 'application/javascript',
            filename: 'obfuscated.js',
            contents: this.props.obfuscatedCode,
        };

        downloadFile(data);
    }

    downloadSourceMap() {
        const data = {
            mime: 'application/octet-stream',
            filename: 'obfuscated.js.map',
            contents: this.props.sourceMap,
        };

        downloadFile(data);
    }

    render() {

        const {dispatch} = this.props;

        const {
            code,
            obfuscatedCode,
            obfuscating,
            obfuscated,
            error,
        } = this.props;

        const hasSourceMap = this.props.sourceMap.length > 0;
        const hasObfuscatedCode = obfuscatedCode.length !== 0;

        return (
            <div>

                <CodeContainer
                    code={code}
                    obfuscatedCode={obfuscatedCode}
                    pending={obfuscating}
                    hasResults={obfuscated || error}
                    onCodeChange={(code) => dispatch(actions.updateCode(code))}
                    onObfuscateClick={::this.obfuscate}
                    onDownloadCodeClick={::this.downloadCode}
                    onDownloadSourceMapClick={::this.downloadSourceMap}
                    hasSourceMap={hasSourceMap}
                    hasObfuscatedCode={hasObfuscatedCode}
                />

                <div className="ui grid">
                    <div className="column">
                        <OptionsContainer/>
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
        obfuscatedCode: code.obfuscatedCode,
        sourceMap: code.sourceMap,
        obfuscating: code.obfuscating,
        obfuscated: code.obfuscated,
        error: code.error,
        options: state.options,
    }
};

export default connect(mapStateToProps)(App);