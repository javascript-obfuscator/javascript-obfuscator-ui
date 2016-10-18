import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Form, Segment, Button } from 'semantic-ui-react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import EditorContainer from '../containers/EditorContainer';

const TAB_CODE = 0;
const TAB_UPLOAD = 1;
const TAB_RESULTS = 2;


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
      selectedTabIndex: TAB_CODE,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pending && nextProps.hasResults) {
      this.setState({
        selectedTabIndex: TAB_RESULTS,
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
          <Title active={tabIndex === TAB_CODE} onClick={() => this.onTabClick(TAB_CODE)}>Copy & Paste Javascript Code</Title>
          <Title active={tabIndex === TAB_UPLOAD} onClick={() => this.onTabClick(TAB_UPLOAD)}>Upload Javascript Files</Title>
          <Title active={tabIndex === TAB_RESULTS} onClick={() => this.onTabClick(TAB_RESULTS)}>Output</Title>
        </div>

        <Pane active={tabIndex === TAB_CODE}>
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

        <Pane active={tabIndex === TAB_UPLOAD}>
          <Dropzone onDrop={::this.onDrop} multiple={false}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Pane>

        <Pane active={tabIndex === TAB_RESULTS}>
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
