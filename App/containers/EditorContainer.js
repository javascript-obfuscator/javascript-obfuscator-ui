import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Codemirror from 'react-codemirror';

require('codemirror/mode/javascript/javascript');

export default class EditorContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: props.value,
        }
    }

    static propTypes = {
        value: PropTypes.string.isRequired,
        onBlur: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.refs.editor.getCodeMirror().execCommand('selectAll');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            code: nextProps.value
        });
    }

    handleOnChange(newCode) {
        this.setState({
            code: newCode
        });
    }

    handleFocusChange(focused) {
        if (!focused) {
            this.props.onBlur(this.state.code);
        }
    }

    render() {
        const options = {
            autofocus: true,
            lineNumbers: true,
            mode: 'javascript',
        };

        return (
            <Codemirror
                ref='editor'
                value={this.state.code}
                onChange={::this.handleOnChange}
                onFocusChange={::this.handleFocusChange}
                options={options}
            />
        );
    }
}
