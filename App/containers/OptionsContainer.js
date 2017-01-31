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

const STRING_ARRAY_ENCODING_OPTIONS = [
	{ text: 'Off', value: 'false' },
	{ text: 'Base64', value: 'base64' },
	{ text: 'RC4', value: 'rc4' },
];

const Options = ({dispatch, options}) =>
  <Form className="OptionsForm">
    <Grid columns={4} relaxed>
      <Grid.Column>
        <Segment basic>

          <Form.Checkbox
            label='Compact code'
            checked={options.compact}
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

          <Divider />

          <Form.Input
            type='number'
            label='Seed'
            defaultValue={options.seed}
            min="0"
            max="99999999"
            step="1"
            onChange={(event) => dispatch(actions.setSeed(parseInt(event.target.value))) } />

        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment basic>

          <Form.Checkbox
            label='String Array'
            checked={options.stringArray}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY)) } />

          <Form.Checkbox
            label='Rotate String Array'
            checked={options.rotateStringArray}
            disabled={!options.rotateStringArrayEnabled}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_ROTATE_STRING_ARRAY)) } />

          <Form.Select
            disabled={!options.stringArrayEncodingEnabled}
            label='String Array Encoding'
            value={options.stringArrayEncoding}
            onChange={(event, {value}) => dispatch(actions.setStringArrayEncoding(value)) }
            options={STRING_ARRAY_ENCODING_OPTIONS} />

          <Form.Input
            type='number'
            label='String Array Threshold'
            defaultValue={options.stringArrayThreshold}
            min="0"
            max="1"
            step="0.1"
            onChange={(event) => dispatch(actions.setStringArrayThreshold(parseFloat(event.target.value))) }
            disabled={!options.stringArrayThresholdEnabled} />

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

          <Form.Checkbox
            label='Control Flow Flatteing'
            checked={options.controlFlowFlattening}
            onChange={() => dispatch(actions.toggleOption(types.TOGGLE_CONTROL_FLOW_FLATTENING)) } />

          <Form.Input
            type='number'
            label='Control Flow Flattening Threshold'
            defaultValue={options.controlFlowFlatteningThreshold}
            min="0"
            max="1"
            step="0.1"
            onChange={(event) => dispatch(actions.setControlFlowFlatteningThreshold(parseFloat(event.target.value))) }
            disabled={!options.controlFlowFlattening} />

          <EntryInputContainer
            label='Domain lock'
            actionAddEntryToState={(domain) => dispatch(actions.addDomainLock(domain)) }
            actionRemoveEntryFromState={(domain) => dispatch(actions.removeDomainLock(domain)) }
            placeholder="domain.com"
            entries={options.domainLock}
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
