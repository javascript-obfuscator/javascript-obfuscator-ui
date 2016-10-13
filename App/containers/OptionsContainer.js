
import React, { Component } from 'react';

import { Form, Grid, Segment, Divider } from 'semantic-ui-react';

import EntryInputContainer from '../containers/EntryInputContainer';

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';


export const SOURCEMAP_OFF = 'off'
export const SOURCEMAP_INLINE = 'inline'
export const SOURCEMAP_SEPARATE = 'separate'

const SOURCEMAP_OPTIONS = [
	{ text: 'Off', value: SOURCEMAP_OFF },
	{ text: 'Inline', value: SOURCEMAP_INLINE },
	{ text: 'Separate', value: SOURCEMAP_SEPARATE },
];


export default class OptionsContainer extends Component {

  static contextTypes = {
    store: React.PropTypes.object
  };

  componentWillMount() {
    this.store = this.context.store;
  }

  toggleOption(optionType) {
    this.store.dispatch(actions.toggleOption(optionType));
  }

  addDomainLock(domain) {
    this.store.dispatch(actions.addDomainLock(domain));
  }

  removeDomainLock(domain) {
    this.store.dispatch(actions.removeDomainLock(domain));
  }

  addReservedName(name) {
    this.store.dispatch(actions.addReservedName(name));
  }

  removeReservedName(name) {
    this.store.dispatch(actions.removeReservedName(name));
  }

  handleUnicodeThreshold(threshold) {
    this.store.dispatch(actions.setUnicodeArrayThreshold(threshold));
  }

  handleSourceMapMode(mode) {
    this.store.dispatch(actions.setSourceMapMode(mode));
  }

  handleSourceMapBaseUrl(baseUrl) {
    this.store.dispatch(actions.setSourceMapBaseUrl(baseUrl));
  }

  handleSourceMapFileName(fileName) {
    this.store.dispatch(actions.setSourceMapFileName(fileName));
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

          <Grid.Column>
            <Segment basic>

              <Form.Select
                label='Sourcemaps'
                value={state.sourceMapMode}
                onChange={(event, {value}) => this.handleSourceMapMode(value) }
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
                onBlur={(event) => this.handleSourceMapFileName(event.target.value) }
                defaultValue={state.sourMapFileName}
                placeholder='example' />

            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment basic>

              <EntryInputContainer
                label='Add a domain lock'
                actionAddEntryToState={::this.addDomainLock}
                actionRemoveEntryFromState={::this.removeDomainLock}
                placeholder="domain.com"
                entries={state.domainLock}
                buttonIcon="plus" />

              <EntryInputContainer
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
