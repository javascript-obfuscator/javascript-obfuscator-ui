import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import { Form } from 'semantic-ui-react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import EditorContainer from './containers/EditorContainer';
import OptionsContainer from './containers/OptionsContainer';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


class App extends Component {

  static contextTypes = {
    store: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
    }

  }

  setCode(code) {
    this.context.store.dispatch({
      type: 'UPDATE_CODE',
      code,
    })
  }

  onTabClick(index) {
    this.setState({
      selectedTabIndex: index,
    });
  }

  handleEditorBlur(code) {
    this.setCode(code);
  }

  onDrop(files) {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.setCode(e.target.result);
    }

    reader.readAsText(file);

  }

  obfuscate() {
    const code = this.context.store.getState().code.code;

    const body = { code, };

    const request = new Request('/obfuscate', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    fetch(request).then((response) => {
      return response.json();
    }).then((ret) => {
      this.setState({
        'obfuscatedCode': ret.code,
        'selectedTabIndex': 2,
      });
    })

  }

  render() {
    const tabIndex = this.state.selectedTabIndex;

    const code = this.context.store.getState().code.code;

    return (
      <div>

        <div className="ui top attached tabular menu">
          <Title active={tabIndex == 0} onClick={() => this.onTabClick(0)}>Copy & Paste Javascript Code</Title>
          <Title active={tabIndex == 1} onClick={() => this.onTabClick(1)}>Upload Javascript Files</Title>
          <Title active={tabIndex == 2} onClick={() => this.onTabClick(2)}>Output</Title>
        </div>

        <Pane active={tabIndex == 0}>
          <EditorContainer onBlur={::this.handleEditorBlur} value={code} />
        </Pane>

        <Pane active={tabIndex == 1}>
          <Dropzone onDrop={::this.onDrop} multiple={false}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Pane>

        <Pane active={tabIndex == 2}>
          <Form>
            <Form.TextArea value={this.state.obfuscatedCode}></Form.TextArea>
          </Form>
        </Pane>

        <Form.Button color='green' onClick={::this.obfuscate}>Obfuscate</Form.Button>

        <div className="ui grid">
          <div className="column">
            <OptionsContainer />
          </div>
        </div>

      </div>
    );
  }

}


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


import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(...middleware));

const _render = () => {
  render(
      <Provider store={store}>
        <App />
      </Provider>
    ,
    document.getElementById('main')
  );
}

_render();

store.subscribe(_render);
