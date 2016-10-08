import React, { Component } from 'react';

import Codemirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');


export default class EditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.value,
    }
    this.updateCode = this.updateCode.bind(this);
  }

  componentDidMount () {
    this.refs.editor.getCodeMirror().execCommand('selectAll');
  }

  componentWillReceiveProps (nextProps) {
    // console.log (nextProps);
    this.setState({
      code: nextProps.value
    });
  }

  updateCode (newCode) {
    this.setState({
      code: newCode
    });
    this.props.onChange(newCode);
  }

  render () {
    var options = {
      lineNumbers: true,
      mode: 'javascript',
      autofocus:  true,
    };
    return (
      <Codemirror ref='editor' value={this.state.code} onChange={this.updateCode} options={options} />
    )
  }

}
