import React, { Component } from 'react';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import { Form, Grid, Segment, Divider } from 'semantic-ui-react';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import Editor from './containers/Editor';
import Options from './containers/Options';


const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


const DEFAULT_CODE = [
  '// Paste your Javascript code here',
  'function hi() {',
  ' console.log("Hello World!");',
  '}',
  'hi();',
].join('\n');


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
      code: DEFAULT_CODE,
      obfuscatedCode: '',
    }

    this.onTabClick = this.onTabClick.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);

    this.obfuscate = this.obfuscate.bind(this);
  }

  setCode(newCode) {
    this.setState({
      code: newCode,
    });
  }

  onTabClick(index) {
    this.setState({
      selectedTabIndex: index,
    });
  }

  onEditorChange(newCode) {
    this.setCode(newCode);
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
    const code = this.state.code;

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
    return (
      <div>
        <div className="ui top attached tabular menu">
          <Title active={this.state.selectedTabIndex == 0} onClick={() => this.onTabClick(0)}>Copy & Paste Javascript Code</Title>
          <Title active={this.state.selectedTabIndex == 1} onClick={() => this.onTabClick(1)}>Upload Javascript Files</Title>
          <Title active={this.state.selectedTabIndex == 2} onClick={() => this.onTabClick(2)}>Output</Title>
        </div>
        <Pane active={this.state.selectedTabIndex == 0}>
          <Editor onChange={this.onEditorChange} value={this.state.code} />
        </Pane>
        <Pane active={this.state.selectedTabIndex == 1}>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            <div>Try dropping some files here, or click to select files to upload.</div>
          </Dropzone>
        </Pane>
        <Pane active={this.state.selectedTabIndex == 2}>
          <Form>
            <Form.TextArea value={this.state.obfuscatedCode}></Form.TextArea>
          </Form>
        </Pane>
        <Form.Button color='green' onClick={this.obfuscate}>Obfuscate</Form.Button>

        <div className="ui grid">
          <div className="column">
            <Options />
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


const Title = (props) => {
  const className = classNames('item', {'active': props.active})
  return (
    <a className={className} onClick={props.onClick}>
      {props.children}
    </a>
  )
}


import {options} from './reducers/options';

const store = createStore(combineReducers({
    options,
  }),
  applyMiddleware(...middleware)
);

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

const unsubscribe = store.subscribe(_render);
