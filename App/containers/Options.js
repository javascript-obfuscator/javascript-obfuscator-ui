
import React, { Component } from 'react';
import {render} from 'react-dom';

import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import { Form } from 'stardust';
import { Grid, Segment, Divider } from 'semantic-ui-react';

import * as types from '../constants/ActionTypes';

import EntryInput from '../containers/EntryInput';


export const SOURCEMAP_OFF = 'off'
export const SOURCEMAP_INLINE = 'inline'
export const SOURCEMAP_SEPARATE = 'separate'

const SOURCEMAP_OPTIONS = [
	{ text: 'Off', value: SOURCEMAP_OFF },
	{ text: 'Inline', value: SOURCEMAP_INLINE },
	{ text: 'Separate', value: SOURCEMAP_SEPARATE },
];


class Options extends React.Component {

  componentWillMount() {
    this.store = this.context.store;
  }

  toggleOption(optionType) {
    this.store.dispatch({
      'type': optionType,
    });
  }

  addDomainLock(domain) {
    this.store.dispatch({
      'type': types.ADD_DOMAIN_LOCK,
      domain,
    });
  }

  removeDomainLock(domain) {
    this.store.dispatch({
      'type': types.REMOVE_DOMAIN_LOCK,
      domain,
    });
  }

  addReservedName(name) {
    this.store.dispatch({
      'type': types.ADD_RESERVED_NAME,
      name,
    });
  }

  removeReservedName(name) {
    this.store.dispatch({
      'type': types.REMOVE_RESERVED_NAME,
      name,
    });
  }

  handleUnicodeThreshold(threshold) {
    this.store.dispatch({
      'type': types.SET_UNICODE_ARRAY_THRESHOLD,
      threshold,
    });
  }

  handleSourceMapMode(mode) {
    this.store.dispatch({
      'type': types.SET_SOURCEMAP_MODE,
      mode,
    });
  }

  handleSourceMapBaseUrl(baseUrl) {
    this.store.dispatch({
      'type': types.SET_SOURCEMAP_BASE_URL,
      baseUrl,
    });
  }

  handleSourceMapFileName(fileName) {
    this.store.dispatch({
      'type': types.SET_SOURCEMAP_FILE_NAME,
      fileName,
    });
  }

  render() {
    const state = this.store.getState().options;

    return (
      <Form>
        <Grid columns={4} relaxed>
          <Grid.Column>
            <Segment basic>

              <Form.Checkbox
                label='Compact code'
                checked={state.compactCode}
                onChange={() => this.toggleOption(types.TOGGLE_COMPACT_CODE) } />

              <Form.Checkbox
                label='Self Defending'
                checked={state.selfDefending}
                onChange={() => this.toggleOption(types.TOGGLE_SELF_DEFENDING) } />

              <Divider />

              <Form.Checkbox
                label='Disable Console Output'
                checked={state.disableConsoleOutput}
                onChange={() => this.toggleOption(types.TOGGLE_DISABLE_CONSOLE_OUTPUT) } />

              <Divider />

              <Form.Checkbox
                label='Debug Protection'
                checked={state.debugProtection}
                onChange={() => this.toggleOption(types.TOGGLE_DEBUG_PROTECTION) } />

              <Form.Checkbox
                label='Debug Protection Interval'
                checked={state.debugProtectionInterval}
                disabled={!state.debugProtection}
                onChange={() => this.toggleOption(types.TOGGLE_DEBUG_PROTECTION_INTERVAL) } />

            </Segment>
          </Grid.Column>

          <Divider vertical />

          <Grid.Column>
            <Segment basic>

              <Form.Checkbox
                label='Unicode Array'
                checked={state.unicodeArray}
                onChange={() => this.toggleOption(types.TOGGLE_UNICODE_ARRAY) } />

              <Form.Checkbox
                label='Rotate Unicode Array'
                checked={state.rotateUnicodeArray}
                disabled={!state.rotateUnicodeArrayEnabled}
                onChange={() => this.toggleOption(types.TOGGLE_ROTATE_UNICODE_ARRAY) } />

              <Form.Checkbox
                label='Wrap Unicode Array Calls'
                checked={state.wrapUnicodeArrayCalls}
                disabled={!state.wrapUnicodeArrayCallsEnabled}
                onChange={() => this.toggleOption(types.TOGGLE_WRAP_UNICODE_ARRAY_CALLS) } />

              <Form.Checkbox
                label='Encode Unicode Array Calls'
                checked={state.encodeUnicodeLiterals}
                disabled={!state.encodeUnicodeLiteralsEnabled}
                onChange={() => this.toggleOption(types.TOGGLE_ENCODE_UNICODE_LITERALS) } />

              <Form.Input
                type='number'
                label='Unicode Array Threshold'
                defaultValue={state.unicodeArrayThreshold}
                min="0"
                max="1"
                step="0.1"
                onChange={(event) => this.handleUnicodeThreshold(event.target.value) }
                disabled={!state.unicodeArrayThresholdEnabled} />

            </Segment>
          </Grid.Column>

          <Divider vertical />

          <Grid.Column>
            <Segment basic>

              <Form.Select
                label='Sourcemaps'
                value={state.sourceMapMode}
                onChange={(event, value) => this.handleSourceMapMode(value) }
                options={SOURCEMAP_OPTIONS} />

              <Form.Input
                label='Source Map Base URL'
                disabled={!state.sourceMapSeparate}
                onBlur={(event) => this.handleSourceMapBaseUrl(event.target.value) }
                defaultValue={state.sourceMapBaseUrl}
                placeholder='http://localhost:3000' />

              <Form.Input
                label='Source Map File Name'
                disabled={!state.sourceMapSeparate}
                onChange={(event) => this.handleSourceMapFileName(event.target.value) }
                value={state.sourMapFileName}
                placeholder='example' />

            </Segment>
          </Grid.Column>

          <Divider vertical />
          <Grid.Column>
            <Segment basic>

              <EntryInput
                label='Add a domain lock'
                actionAddEntryToState={::this.addDomainLock}
                actionRemoveEntryFromState={::this.removeDomainLock}
                placeholder="domain.com"
                entries={state.domainLock}
                buttonIcon="plus" />

              <EntryInput
                label='Reserved Names'
                actionAddEntryToState={::this.addReservedName}
                actionRemoveEntryFromState={::this.removeReservedName}
                placeholder="^someVariable"
                entries={state.reservedNames}
                buttonIcon="plus" />

            </Segment>
          </Grid.Column>

        </Grid>
      </Form>

    );

  }

}

Options.contextTypes = {
  store: React.PropTypes.object
};

export default Options;
