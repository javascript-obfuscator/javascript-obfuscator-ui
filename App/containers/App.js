import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Adsense} from '@ctrl/react-adsense';
import { ConsentProvider, ConsentBanner } from 'react-hook-consent';
import 'react-hook-consent/dist/styles/style.css';
import {Helmet} from "react-helmet";
import Cookies from 'js-cookie'

import {connect} from 'react-redux';

import {downloadFile} from '../util/downloadFile';

import * as actions from '../actions';

import CodeContainer from './CodeContainer';
import OptionsContainer from './OptionsContainer';

class App extends Component {

    state = {
        cookiesEnabled: Cookies.get('cookies-enabled'),
    }

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

    constructor() {
        super();

        window.enableCookies = this.enableCookies.bind(this);
    }

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

    enableCookies() {
        this.setState({cookiesEnabled: true});
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
                <Helmet>
                    {this.state.cookiesEnabled && (
                      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5000712498982649"
                              crossOrigin="anonymous"></script>
                    )}
                </Helmet>

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

                <ConsentProvider
                   options={{
                      services: [
                          {
                              id: 'analytics_and_ads',
                              name: 'Analytics & Ads',
                              scripts: [
                                  { id: 'enable-cookies', code: 'window.enableCookies()' },
                              ],
                              cookies: [],
                              mandatory: false,
                          },
                      ],
                      theme: 'light',
                   }}
                >
                    <ConsentBanner
                      settings={{ hidden: false, label: 'More', modal: { title: 'Cookie settings' } }}
                      decline={{ show: true, label: 'Reject' }}
                      approve={{ label: 'Accept' }}
                    >
                        Can we use cookies and external services according to our <a href="/docs/cookie-policy.docx">cookie policy</a>?
                    </ConsentBanner>
                </ConsentProvider>
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