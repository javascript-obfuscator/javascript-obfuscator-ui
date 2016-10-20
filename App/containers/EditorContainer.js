import React, { Component } from 'react';

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
    value: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.refs.editor.getCodeMirror().execCommand('selectAll');
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      code: nextProps.value
    });
  }

  handleOnChange (newCode) {
    this.setState({
      code: newCode
    });
  }

  handleFocusChange (focused) {
    if (!focused) {
      this.props.onBlur(this.state.code);
    }
  }

  render () {
    var options = {
      autofocus:  true,
      lineNumbers: true,
      mode: 'javascript',
    };
    return (
      <Codemirror
        ref='editor'
        value={this.state.code}
        onChange={::this.handleOnChange}
        onFocusChange={::this.handleFocusChange}
        options={options} />
    )
  }

}
