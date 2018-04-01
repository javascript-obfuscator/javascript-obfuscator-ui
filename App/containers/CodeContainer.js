import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import EditorContainer from '../containers/EditorContainer';

const TAB_CODE = 0;
const TAB_UPLOAD = 1;
const TAB_RESULTS = 2;


class CodeContainer extends Component {

  static propTypes = {
    code: PropTypes.string,
    obfuscatedCode: PropTypes.string,
    pending: PropTypes.bool,
    hasResults: PropTypes.bool,
    onCodeChange: PropTypes.func,
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
    }
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

  onDrop(files) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      this.props.onCodeChange(event.target.result);
    }

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

  }

  // from https://github.com/babel/babel.github.io/blob/e7d082e4d545a75d7aa29b1df580c86114ab1586/scripts/7.js#L361
  evaluate (code) {
    this.capturingConsole = Object.create(console);
    const capturingConsole = this.capturingConsole;
    let buffer = [];
    var done = false;

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
    function prettyFormat (str) {
      return str;
    }

    function capture() {
      const logs = [].map.call(arguments, (log) => {
        return prettyFormat(log);
      });
      write(logs.join('\n'));
    }

    ['error', 'log', 'info', 'debug'].forEach(function(key) {
      capturingConsole[key] = function() {
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

  render() {
    const tabIndex = this.state.selectedTabIndex;

    const {
      code,
      obfuscatedCode,
      pending,
      onCodeChange,
      onObfuscateClick,
      onDownloadCodeClick,
      onDownloadSourceMapClick,
      hasSourceMap,
      hasObfuscatedCode,
    } = this.props;

    return (
      <div>

        <div className="ui top attached stackable three item menu">
          <Title active={tabIndex === TAB_CODE} onClick={() => this.onTabClick(TAB_CODE)}>Copy & Paste JavaScript Code</Title>
          <Title active={tabIndex === TAB_UPLOAD} onClick={() => this.onTabClick(TAB_UPLOAD)}>Upload JavaScript Files</Title>
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
          <Dropzone onDrop={::this.onDrop} multiple={false} className="DropZone">
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Pane>

        <Pane active={tabIndex === TAB_RESULTS}>
          <Form>
            <Form.TextArea
              value={obfuscatedCode}
              onFocus={(event) => event.target.select()}
              ></Form.TextArea>
          </Form>

          <Grid columns={2} relaxed>
            <Grid.Column width={13}>
              <Segment basic>
                <Button
                  disabled={!hasObfuscatedCode}
                  onClick={onDownloadCodeClick}
                  >
                    <Icon name='download' /> Download obfuscated code
                </Button>
                { hasSourceMap &&
                <Button
                  onClick={onDownloadSourceMapClick}
                  >
                    <Icon name='download' /> Download source map file
                </Button>
                }
              </Segment>
            </Grid.Column>

            <Grid.Column width={3}>
              <Segment basic>
                <Form.Checkbox
                  label='Evaluate'
                  checked={this.state.evaluate}
                  onChange={this.toggleEvaluate} />
              </Segment>
            </Grid.Column>
          </Grid>

          {this.state.evaluate &&
            <Segment basic>
              <div className="evaluatedCode">
                {this.state.evaluatedResult}
              </div>
            </Segment>
          }
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
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
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
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
}
