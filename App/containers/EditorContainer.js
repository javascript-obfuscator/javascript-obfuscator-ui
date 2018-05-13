import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Controlled as CodeMirror} from 'react-codemirror2'

require('codemirror/mode/javascript/javascript');

export default class EditorContainer extends Component {
    editor = null;

    constructor(props) {
        super(props);

        this.state = {
            code: props.value
        }
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        onBlur: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.value
        });

        setTimeout(() => {
            this.editor && this.editor.refresh();
        }, 1);
    }

    handleEditorMount(editor) {
        editor.execCommand('selectAll');
        this.editor = editor;
    }

    handleOnChange(editor, data, value) {
        this.setState({
            code: value
        });
    }

    handleFocusChange(editor) {
        this.props.onBlur(editor.getValue());
    }

    render() {
        const options = {
            autofocus: false,
            lineNumbers: true,
            mode: 'javascript',
        };

        return (
            <CodeMirror
                editorDidMount={::this.handleEditorMount}
                value={this.state.code}
                onBeforeChange={::this.handleOnChange}
                onFocus={::this.handleFocusChange}
                onBlur={::this.handleFocusChange}
                options={options}
            />
        );
    }
}
