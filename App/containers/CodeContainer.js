import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Form, Grid, Segment, Button, Icon, Tab} from 'semantic-ui-react';

import Dropzone from 'react-dropzone';

import EditorContainer from '../containers/EditorContainer';
import {DEFAULT_OUTPUT_FILE_NAME} from '../reducers/code';

const TAB_CODE = 0;
const TAB_RESULTS = 2;

class CodeContainer extends Component {

    static propTypes = {
        code: PropTypes.string,
        obfuscatedCode: PropTypes.string,
        pending: PropTypes.bool,
        hasResults: PropTypes.bool,
        onCodeChange: PropTypes.func,
        onOutputFileNameChange: PropTypes.func,
        onObfuscateClick: PropTypes.func,
        onDownloadCodeClick: PropTypes.func,
        onDownloadSourceMapClick: PropTypes.func,
        hasSourceMap: PropTypes.bool,
        hasObfuscatedCode: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedTabIndex: TAB_CODE,
            evaluate: false,
            evaluatedResult: '',
        };

        this.capturingConsole = null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pending && nextProps.hasResults) {
            this.setState({
                selectedTabIndex: TAB_RESULTS,
            })
        }

        if (this.state.evaluate) {
            this.evaluate(nextProps.obfuscatedCode);
        }
    }

    onTabClick(index) {
        this.setState({
            selectedTabIndex: index,
        });
    }

    onCodeChange(code) {
        const {code: prevCode, onCodeChange, onOutputFileNameChange} = this.props;

        onCodeChange(code);

        if (code !== prevCode) {
            onOutputFileNameChange(DEFAULT_OUTPUT_FILE_NAME);
        }
    }

    onDrop(files) {
        const {onCodeChange, onOutputFileNameChange} = this.props;

        if (!window.File || !window.FileReader) {
            alert('Your browser does not support File API');
        }

        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            onCodeChange(event.target.result);
            onOutputFileNameChange(file.name);
            this.onTabClick(TAB_CODE);
        };

        reader.readAsText(file);
    }

    toggleEvaluate = () => {
        const nextEvaluate = !this.state.evaluate;

        this.setState({
            evaluate: nextEvaluate,
        });

        if (nextEvaluate) {
            this.evaluate(this.props.obfuscatedCode);
        }

    };

    // from https://github.com/babel/babel.github.io/blob/e7d082e4d545a75d7aa29b1df580c86114ab1586/scripts/7.js#L361
    evaluate(code) {
        this.capturingConsole = Object.create(console);

        const capturingConsole = this.capturingConsole;
        let done = false;

        let buffer = [];

        const self = this;

        function flush() {
            self.setState({
                evaluatedResult: buffer.join('\n'),
            })
        }

        function write(data) {
            buffer.push(data);
            if (done) flush();
        }

        // TODO: replace this function with a proper one
        // right now the `pretty-format` npm package doesn't work with the uglify
        function prettyFormat(str) {
            return str;
        }

        function capture() {
            const logs = [].map.call(arguments, (log) => {
                return prettyFormat(log);
            });

            write(logs.join('\n'));
        }

        ['error', 'log', 'info', 'debug'].forEach(function (key) {
            capturingConsole[key] = function () {
                Function.prototype.apply.call(console[key], console, arguments);
                capture.apply(this, arguments);
            };
        });

        try {
            new Function('console', code)(capturingConsole);
        } catch (err) {
            buffer.push(err.message);
        }

        done = true;
        flush();
    }

    buildPanes() {
        const {
            code,
            obfuscatedCode,
            pending,
            onObfuscateClick,
            onDownloadCodeClick,
            onDownloadSourceMapClick,
            hasSourceMap,
            hasObfuscatedCode,
        } = this.props;

        return [
            {
                menuItem: {
                    as: 'a',
                    content: 'Copy & Paste JavaScript Code',
                    href: "#code",
                },
                render: () => (
                    <Pane>
                        <EditorContainer onBlur={::this.onCodeChange} value={code}/>
                        <Segment basic>
                            <Button
                                loading={pending}
                                disabled={pending}
                                primary
                                onClick={onObfuscateClick}
                            >
                                Obfuscate
                            </Button>
                        </Segment>
                    </Pane>
                )
            },
            {
                menuItem: {
                    as: 'a',
                    content: 'Upload JavaScript File',
                    href: "#upload",
                },
                render: () => (
                    <Pane>
                        <Dropzone
                            onDrop={::this.onDrop}
                            multiple={false}
                        >
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps({className: 'DropZone'})}>
                                        <input {...getInputProps()} />
                                        <div>Try dropping some file here, or click to select file to upload.</div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Pane>
                )
            },
            {
                menuItem: {
                    as: 'a',
                    content: 'Output',
                    href: "#output",
                },
                render: () => (
                    <Pane>
                        <Grid stackable columns={2} relaxed>
                            <Grid.Column width={16}>
                                <Form>
                                    <Form.TextArea
                                        value={obfuscatedCode}
                                        rows={8}
                                        onFocus={(event) => event.target.select()}
                                    />
                                </Form>
                            </Grid.Column>

                            <Grid.Column width={13}>
                                <Button
                                    disabled={!hasObfuscatedCode}
                                    onClick={onDownloadCodeClick}
                                >
                                    <Icon name='download'/> Download obfuscated code
                                </Button>

                                {hasSourceMap &&
                                    <Button
                                        onClick={onDownloadSourceMapClick}
                                    >
                                        <Icon name='download'/> Download source map file
                                    </Button>
                                }
                            </Grid.Column>

                            <Grid.Column width={3} verticalAlign="middle">
                                <Form.Checkbox
                                    label='Evaluate'
                                    checked={this.state.evaluate}
                                    onChange={this.toggleEvaluate}
                                />
                            </Grid.Column>

                            {this.state.evaluate &&
                                <Grid.Column width={16}>
                                    <div className="evaluatedCode">
                                        {this.state.evaluatedResult}
                                    </div>
                                </Grid.Column>
                            }
                        </Grid>
                    </Pane>
                )
            }
        ];
    }

    render() {
        const tabIndex = this.state.selectedTabIndex;

        return (
            <Tab
                activeIndex={tabIndex}
                menu={{attached: 'top', stackable: true, widths: 'three'}}
                panes={this.buildPanes()}
                onTabChange={(event, data) => this.onTabClick(data.activeIndex)}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        code: state.code.code,
        obfuscatedCode: state.code.obfuscatedCode,
        obfuscating: state.obfuscating,
    }
};

export default connect(mapStateToProps)(CodeContainer);


const Pane = (props) => {
    return (
        <div className="ui bottom attached tab segment active">
            {props.children}
        </div>
    )
};

Pane.propTypes = {
    children: PropTypes.node.isRequired,
};
