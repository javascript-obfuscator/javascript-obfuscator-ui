import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Form, Segment, Button } from 'semantic-ui-react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import EditorContainer from '../containers/EditorContainer';


class CodeContainer extends Component {

  static propTypes = {
    code: React.PropTypes.string,
    obfuscatedCode: React.PropTypes.string,
    pending: React.PropTypes.bool,
    hasResults: React.PropTypes.bool,
    onCodeChange: React.PropTypes.func,
    onObfuscateClick: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pending && nextProps.hasResults) {
      this.setState({
        selectedTabIndex: 2,
      })
    }
  }

  onTabClick(index) {
    this.setState({
      selectedTabIndex: index,
    });
  }

  onDrop(files) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      this.props.onCodeChange(event.target.result);
    }

    reader.readAsText(file);

  }

  render() {
    const tabIndex = this.state.selectedTabIndex;

    const {
      code,
      obfuscatedCode,
      pending,
      onCodeChange,
      onObfuscateClick,
    } = this.props;

    return (
      <div>

        <div className="ui top attached tabular menu">
          <Title active={tabIndex == 0} onClick={() => this.onTabClick(0)}>Copy & Paste Javascript Code</Title>
          <Title active={tabIndex == 1} onClick={() => this.onTabClick(1)}>Upload Javascript Files</Title>
          <Title active={tabIndex == 2} onClick={() => this.onTabClick(2)}>Output</Title>
        </div>

        <Pane active={tabIndex == 0}>
          <EditorContainer onBlur={onCodeChange} value={code} />
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

        <Pane active={tabIndex == 1}>
          <Dropzone onDrop={::this.onDrop} multiple={false}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Pane>

        <Pane active={tabIndex == 2}>
          <Form>
            <Form.TextArea value={obfuscatedCode}></Form.TextArea>
          </Form>
        </Pane>

      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    code: state.code.code,
    obfuscatedCode: state.code.obfuscatedCode,
    obfuscating: state.obfuscating,
  }
}

export default connect(mapStateToProps)(CodeContainer);


const Pane = (props) => {
  const className = classNames('ui bottom attached tab segment'.split(' '), {'active': props.active})
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}

Pane.propTypes = {
  active: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired,
}


const Title = (props) => {
  const className = classNames('item', {'active': props.active})
  return (
    <a className={className} onClick={props.onClick}>
      {props.children}
    </a>
  )
}

Title.propTypes = {
  active: React.PropTypes.bool.isRequired,
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func.isRequired,
}
