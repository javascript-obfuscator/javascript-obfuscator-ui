import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Form, Grid, Segment, Divider, Button} from 'semantic-ui-react';

import EntryInputContainer from '../containers/EntryInputContainer';

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';

export const SOURCEMAP_OFF = 'off';
export const SOURCEMAP_INLINE = 'inline';
export const SOURCEMAP_SEPARATE = 'separate';

const SOURCEMAP_OPTIONS = [
    {text: 'Off', value: SOURCEMAP_OFF},
    {text: 'Inline', value: SOURCEMAP_INLINE},
    {text: 'Separate', value: SOURCEMAP_SEPARATE},
];

const STRING_ARRAY_ENCODING_OPTIONS = [
    {text: 'Off', value: 'false'},
    {text: 'Base64', value: 'base64'},
    {text: 'RC4', value: 'rc4'},
];

export const TARGET_BROWSER = 'browser';
export const TARGET_BROWSER_NO_EVAL = 'browser-no-eval';
export const TARGET_NODE = 'node';

const TARGET_OPTIONS = [
    {text: 'Browser', value: TARGET_BROWSER},
    {text: 'Browser No Eval', value: TARGET_BROWSER_NO_EVAL},
    {text: 'Node', value: TARGET_NODE},
];

export const IDENTIFIER_NAMES_GENERATOR_DICTIONARY = 'dictionary';
export const IDENTIFIER_NAMES_GENERATOR_HEXADECIMAL = 'hexadecimal';
export const IDENTIFIER_NAMES_GENERATOR_MANGLED = 'mangled';

const IDENTIFIER_NAMES_GENERATOR_OPTIONS = [
    {text: 'dictionary', value: IDENTIFIER_NAMES_GENERATOR_DICTIONARY},
    {text: 'hexadecimal', value: IDENTIFIER_NAMES_GENERATOR_HEXADECIMAL},
    {text: 'mangled', value: IDENTIFIER_NAMES_GENERATOR_MANGLED},
];

const Options = ({dispatch, options}) =>
    <Form className="OptionsForm">
        <Grid columns={4} relaxed stackable doubling>
            <Grid.Column style={{display: 'block'}}>
                <Segment basic>
                    <Button
                        fluid
                        onClick={() => dispatch(actions.resetOptions())}
                    >
                        Reset options
                    </Button>

                    <Divider/>

                    <Form.Checkbox
                        label='Compact code'
                        checked={options.compact}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_COMPACT_CODE))}/>

                    <Form.Select
                        label='Identifier Names Generator'
                        value={options.identifierNamesGenerator}
                        fluid
                        onChange={(event, {value}) => dispatch(actions.setIdentifierNamesGenerator(value))}
                        options={IDENTIFIER_NAMES_GENERATOR_OPTIONS}/>

                    <EntryInputContainer
                        label='Identifiers Dictionary'
                        disabled={options.identifierNamesGenerator !== IDENTIFIER_NAMES_GENERATOR_DICTIONARY}
                        actionAddEntryToState={(name) => dispatch(actions.addDictionaryIdentifier(name))}
                        actionRemoveEntryFromState={(name) => dispatch(actions.removeDictionaryIdentifier(name))}
                        placeholder="foo"
                        entries={options.identifiersDictionary}
                        buttonIcon="plus"/>

                    <Form.Input
                        label='Identifiers Prefix'
                        onBlur={(event) => dispatch(actions.setIdentifiersPrefix(event.target.value))}
                        defaultValue={options.identifiersPrefix}
                        placeholder=''/>

                    <Form.Checkbox
                        label='Rename Globals'
                        checked={options.renameGlobals}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_RENAME_GLOBALS))}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Self Defending'
                        checked={options.selfDefending}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SELF_DEFENDING))}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Control Flow Flattening'
                        checked={options.controlFlowFlattening}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_CONTROL_FLOW_FLATTENING))}/>

                    <Form.Input
                        type='number'
                        label='Control Flow Flattening Threshold'
                        defaultValue={options.controlFlowFlatteningThreshold}
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={(event) => dispatch(actions.setControlFlowFlatteningThreshold(parseFloat(event.target.value)))}
                        disabled={!options.controlFlowFlattening}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Dead Code Injection'
                        checked={options.deadCodeInjection}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEAD_CODE_INJECTION))}/>

                    <Form.Input
                        type='number'
                        label='Dead Code Injection Threshold'
                        defaultValue={options.deadCodeInjectionThreshold}
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={(event) => dispatch(actions.setDeadCodeInjectionThreshold(parseFloat(event.target.value)))}
                        disabled={!options.deadCodeInjection}/>


                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment basic>

                    <Form.Checkbox
                        label='String Array'
                        checked={options.stringArray}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY))}/>

                    <Form.Checkbox
                        label='Rotate String Array'
                        checked={options.rotateStringArray}
                        disabled={!options.rotateStringArrayEnabled}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_ROTATE_STRING_ARRAY))}/>

                    <Form.Checkbox
                        label='Shuffle String Array'
                        checked={options.shuffleStringArray}
                        disabled={!options.shuffleStringArrayEnabled}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SHUFFLE_STRING_ARRAY))}/>

                    <Form.Select
                        disabled={!options.stringArrayEncodingEnabled}
                        label='String Array Encoding'
                        fluid
                        value={options.stringArrayEncoding}
                        onChange={(event, {value}) => dispatch(actions.setStringArrayEncoding(value))}
                        options={STRING_ARRAY_ENCODING_OPTIONS}/>

                    <Form.Input
                        type='number'
                        label='String Array Threshold'
                        defaultValue={options.stringArrayThreshold}
                        min="0"
                        max="1"
                        step="0.1"
                        onChange={(event) => dispatch(actions.setStringArrayThreshold(parseFloat(event.target.value)))}
                        disabled={!options.stringArrayThresholdEnabled}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Split Strings'
                        checked={options.splitStrings}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SPLIT_STRINGS))}/>

                    <Form.Input
                        type='number'
                        label='Split Strings Chunk Length'
                        defaultValue={options.splitStringsChunkLength}
                        min="1"
                        step="1"
                        onChange={(event) => dispatch(actions.setSplitStringsChunkLength(parseInt(event.target.value)))}
                        disabled={!options.splitStringsChunkLengthEnabled}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Transform Object Keys'
                        checked={options.transformObjectKeys}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_TRANSFORM_OBJECT_KEYS))}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Unicode Escape Sequence'
                        checked={options.unicodeEscapeSequence}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_UNICODE_ESCAPE_SEQUENCE))}/>

                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment basic>

                    <Form.Checkbox
                        label='Disable Console Output'
                        checked={options.disableConsoleOutput}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DISABLE_CONSOLE_OUTPUT))}/>

                    <Divider/>

                    <Form.Checkbox
                        label='Debug Protection'
                        checked={options.debugProtection}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEBUG_PROTECTION))}/>

                    <Form.Checkbox
                        label='Debug Protection Interval'
                        checked={options.debugProtectionInterval}
                        disabled={!options.debugProtection}
                        onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEBUG_PROTECTION_INTERVAL))}/>

                    <Divider/>

                    <EntryInputContainer
                        label='Domain lock'
                        disabled={!options.domainLockEnabled}
                        actionAddEntryToState={(domain) => dispatch(actions.addDomainLock(domain))}
                        actionRemoveEntryFromState={(domain) => dispatch(actions.removeDomainLock(domain))}
                        placeholder="domain.com"
                        entries={options.domainLock}
                        buttonIcon="plus"/>

                    <EntryInputContainer
                        label='Reserved Names'
                        actionAddEntryToState={(name) => dispatch(actions.addReservedName(name))}
                        actionRemoveEntryFromState={(name) => dispatch(actions.removeReservedName(name))}
                        placeholder="^someVariable *or *RegExp"
                        entries={options.reservedNames}
                        buttonIcon="plus"/>

                    <EntryInputContainer
                        label='Reserved Strings'
                        actionAddEntryToState={(string) => dispatch(actions.addReservedString(string))}
                        actionRemoveEntryFromState={(string) => dispatch(actions.removeReservedString(string))}
                        placeholder="^some *string *or RegExp"
                        entries={options.reservedStrings}
                        buttonIcon="plus"/>

                </Segment>
            </Grid.Column>

            <Grid.Column>
                <Segment basic>

                    <Form.Select
                        label='Sourcemaps'
                        value={options.sourceMapMode}
                        fluid
                        onChange={(event, {value}) => dispatch(actions.setSourceMapMode(value))}
                        options={SOURCEMAP_OPTIONS}/>

                    <Form.Input
                        label='Source Map Base URL'
                        disabled={!options.sourceMapSeparate}
                        onBlur={(event) => dispatch(actions.setSourceMapBaseUrl(event.target.value))}
                        defaultValue={options.sourceMapBaseUrl}
                        placeholder='http://localhost:3000'/>

                    <Form.Input
                        label='Source Map File Name'
                        disabled={!options.sourceMapSeparate}
                        onBlur={(event) => dispatch(actions.setSourceMapFileName(event.target.value))}
                        defaultValue={options.sourceMapFileName}
                        placeholder='example'/>

                    <Divider/>

                    <Form.Input
                        type='number'
                        label='Seed'
                        defaultValue={options.seed}
                        min="0"
                        max="99999999"
                        step="1"
                        onChange={(event) => dispatch(actions.setSeed(parseInt(event.target.value)))}/>

                    <Divider/>

                    <Form.Select
                        label='Target'
                        value={options.target}
                        fluid
                        onChange={(event, {value}) => dispatch(actions.setTarget(value))}
                        options={TARGET_OPTIONS}/>

                </Segment>
            </Grid.Column>

        </Grid>
    </Form>;


Options.propTypes = {
    dispatch: PropTypes.func.isRequired,
    options: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        options: state.options,
    }
};

export default connect(mapStateToProps)(Options);
