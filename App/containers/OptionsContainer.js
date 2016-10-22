import React from 'react';

import { connect } from 'react-redux';

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


const Options = ({dispatch, options}) =>
  <Form className="OptionsForm">
    <Grid columns={4} relaxed>
      <Grid.Column>
        <Segment basic>

          <Form.Checkbox
            label='Compact code'
            checked={options.compactCode}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_COMPACT_CODE)) } />

          <Form.Checkbox
            label='Self Defending'
            checked={options.selfDefending}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SELF_DEFENDING)) } />

          <Divider />

          <Form.Checkbox
            label='Disable Console Output'
            checked={options.disableConsoleOutput}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DISABLE_CONSOLE_OUTPUT)) } />

          <Divider />

          <Form.Checkbox
            label='Debug Protection'
            checked={options.debugProtection}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEBUG_PROTECTION)) } />

          <Form.Checkbox
            label='Debug Protection Interval'
            checked={options.debugProtectionInterval}
            disabled={!options.debugProtection}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEBUG_PROTECTION_INTERVAL)) } />

        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment basic>

          <Form.Checkbox
            label='Unicode Array'
            checked={options.unicodeArray}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_UNICODE_ARRAY)) } />

          <Form.Checkbox
            label='Rotate Unicode Array'
            checked={options.rotateUnicodeArray}
            disabled={!options.rotateUnicodeArrayEnabled}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_ROTATE_UNICODE_ARRAY)) } />

          <Form.Checkbox
            label='Wrap Unicode Array Calls'
            checked={options.wrapUnicodeArrayCalls}
            disabled={!options.wrapUnicodeArrayCallsEnabled}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_WRAP_UNICODE_ARRAY_CALLS)) } />

          <Form.Checkbox
            label='Encode Unicode Array Calls'
            checked={options.encodeUnicodeLiterals}
            disabled={!options.encodeUnicodeLiteralsEnabled}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_ENCODE_UNICODE_LITERALS)) } />

          <Form.Input
            type='number'
            label='Unicode Array Threshold'
            defaultValue={options.unicodeArrayThreshold}
            min="0"
            max="1"
            step="0.1"
            onChange={(event) => dispatch(actions.setUnicodeArrayThreshold(event.target.value)) }
            disabled={!options.unicodeArrayThresholdEnabled} />

        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment basic>

          <Form.Select
            label='Sourcemaps'
            value={options.sourceMapMode}
            onChange={(event, {value}) => dispatch(actions.setSourceMapMode(value)) }
            options={SOURCEMAP_OPTIONS} />

          <Form.Input
            label='Source Map Base URL'
            disabled={!options.sourceMapSeparate}
            onBlur={(event) => dispatch(actions.setSourceMapBaseUrl(event.target.value)) }
            defaultValue={options.sourceMapBaseUrl}
            placeholder='http://localhost:3000' />

          <Form.Input
            label='Source Map File Name'
            disabled={!options.sourceMapSeparate}
            onBlur={(event) => dispatch(actions.setSourceMapFileName(event.target.value)) }
            defaultValue={options.sourceMapFileName}
            placeholder='example' />

        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment basic>

          <EntryInputContainer
            label='Add a domain lock'
            actionAddEntryToState={(domain) => dispatch(actions.addDomainLock(domain)) }
            actionRemoveEntryFromState={(domain) => dispatch(actions.removeDomainLock(domain)) }
            placeholder="domain.com"
            entries={options.domainLock}
            disabled={true}
            buttonIcon="plus" />

          <EntryInputContainer
            label='Reserved Names'
            actionAddEntryToState={(name) => dispatch(actions.addReservedName(name)) }
            actionRemoveEntryFromState={(name) => dispatch(actions.removeReservedName(name)) }
            placeholder="^someVariable"
            entries={options.reservedNames}
            buttonIcon="plus" />

        </Segment>
      </Grid.Column>

    </Grid>
  </Form>


Options.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  options: React.PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    options: state.options,
  }
}

export default connect(mapStateToProps)(Options);