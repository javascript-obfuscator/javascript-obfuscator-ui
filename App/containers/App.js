import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Adsense} from '@ctrl/react-adsense';

import {connect} from 'react-redux';

import {downloadFile} from '../util/downloadFile';

import * as actions from '../actions';

import CodeContainer from './CodeContainer';
import OptionsContainer from './OptionsContainer';
import { ConsentHandler } from "./ConsentHandler";

class App extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
        code: PropTypes.string,
        obfuscatedCode: PropTypes.string,
        outputFileName: PropTypes.string,
        sourceMap: PropTypes.string,
        obfuscating: PropTypes.bool,
        obfuscated: PropTypes.bool,
        error: PropTypes.bool,
        options: PropTypes.object,
    };

    obfuscate() {
        const {dispatch} = this.props;
        const {code, options} = this.props;

        dispatch(actions.obfuscateCode(code, {...options}));
    }

    downloadCode() {
        const data = {
            mime: 'application/javascript',
            filename: this.props.outputFileName,
            contents: this.props.obfuscatedCode,
        };

        downloadFile(data);
    }

    downloadSourceMap() {
        const data = {
            mime: 'application/octet-stream',
            filename: `${this.props.outputFileName}.map`,
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
            <React.Fragment>
                <CodeContainer
                    code={code}
                    obfuscatedCode={obfuscatedCode}
                    pending={obfuscating}
                    hasResults={obfuscated || error}
                    onCodeChange={(code) => dispatch(actions.updateCode(code))}
                    onOutputFileNameChange={(fileName) => dispatch(actions.updateOutputFileName(fileName))}
                    onObfuscateClick={::this.obfuscate}
                    onDownloadCodeClick={::this.downloadCode}
                    onDownloadSourceMapClick={::this.downloadSourceMap}
                    hasSourceMap={hasSourceMap}
                    hasObfuscatedCode={hasObfuscatedCode}
                />

                <div style={{ width: '100%', marginTop: '8px', marginBottom: '8px' }}>
                    <Adsense
                      client="ca-pub-5000712498982649"
                      slot="1666508371"
                      format="auto"
                    />
                </div>

                <OptionsContainer/>

                <ConsentHandler />
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    const code = state.code;
    return {
        code: code.code,
        obfuscatedCode: code.obfuscatedCode,
        outputFileName: code.outputFileName,
        sourceMap: code.sourceMap,
        obfuscating: code.obfuscating,
        obfuscated: code.obfuscated,
        error: code.error,
        options: state.options,
    }
};

export default connect(mapStateToProps)(App);