import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
const ReactMarkdown = require('react-markdown')

import {Container, Form, Grid, Header, Segment, Divider, Button} from 'semantic-ui-react';

import EntryInputContainer from '../containers/EntryInputContainer';
import {getOptionsMarkdown} from '../util/get-options-markdown';
import {getHeadingRenderer} from '../util/get-heading-renderer';
import {getEmojiSupportRenderer} from '../util/get-emoji-support-renderer';

import * as types from '../constants/ActionTypes';
import * as actions from '../actions';

export const OPTIONS_PRESET_DEFAULT = 'default';
export const OPTIONS_PRESET_LOW_OBFUSCATION = 'low-obfuscation';
export const OPTIONS_PRESET_MEDIUM_OBFUSCATION = 'medium-obfuscation';
export const OPTIONS_PRESET_HIGH_OBFUSCATION = 'high-obfuscation';

const OPTIONS_PRESET_OPTIONS = [
    {text: 'Default', value: OPTIONS_PRESET_DEFAULT},
    {text: 'Low', value: OPTIONS_PRESET_LOW_OBFUSCATION},
    {text: 'Medium', value: OPTIONS_PRESET_MEDIUM_OBFUSCATION},
    {text: 'High', value: OPTIONS_PRESET_HIGH_OBFUSCATION},
];

export const SOURCEMAP_INLINE = 'inline';
export const SOURCEMAP_SEPARATE = 'separate';

const SOURCEMAP_OPTIONS = [
    {text: 'Inline', value: SOURCEMAP_INLINE},
    {text: 'Separate', value: SOURCEMAP_SEPARATE},
];

export const STRING_ARRAY_ENCODING_NONE = 'none';
export const STRING_ARRAY_ENCODING_BASE64 = 'base64';
export const STRING_ARRAY_ENCODING_RC4 = 'rc4';

const STRING_ARRAY_ENCODING_OPTIONS = [
    {text: 'None', value: STRING_ARRAY_ENCODING_NONE},
    {text: 'Base64', value: STRING_ARRAY_ENCODING_BASE64},
    {text: 'RC4', value: STRING_ARRAY_ENCODING_RC4},
];

export const STRING_ARRAY_WRAPPERS_TYPE_VARIABLE = 'variable';
export const STRING_ARRAY_WRAPPERS_TYPE_FUNCTION = 'function';

const STRING_ARRAY_WRAPPERS_TYPE_OPTIONS = [
    {text: 'Variable', value: STRING_ARRAY_WRAPPERS_TYPE_VARIABLE},
    {text: 'Function', value: STRING_ARRAY_WRAPPERS_TYPE_FUNCTION},
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
export const IDENTIFIER_NAMES_GENERATOR_MANGLED_SHUFFLED = 'mangled-shuffled';

const IDENTIFIER_NAMES_GENERATOR_OPTIONS = [
    {text: 'Dictionary', value: IDENTIFIER_NAMES_GENERATOR_DICTIONARY},
    {text: 'Hexadecimal', value: IDENTIFIER_NAMES_GENERATOR_HEXADECIMAL},
    {text: 'Mangled', value: IDENTIFIER_NAMES_GENERATOR_MANGLED},
    {text: 'Mangled-shuffled', value: IDENTIFIER_NAMES_GENERATOR_MANGLED_SHUFFLED},
];

const Options = ({dispatch, options}) => {
    useEffect(
        () => {
            actions.setOptionsPreset(OPTIONS_PRESET_DEFAULT)
        },
        []
    );

    return (
        <React.Fragment>
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

                            <Form.Select
                                label='Options Preset'
                                value={options.optionsPreset}
                                fluid
                                onChange={(event, {value}) => dispatch(actions.setOptionsPreset(value))}
                                options={OPTIONS_PRESET_OPTIONS}/>

                            <Divider/>

                            <Form.Select
                                label='Target'
                                value={options.target}
                                fluid
                                onChange={(event, {value}) => dispatch(actions.setTarget(value))}
                                options={TARGET_OPTIONS}/>

                            <Form.Input
                                type='number'
                                label='Seed'
                                value={options.seed}
                                min="0"
                                max="99999999"
                                step="1"
                                onChange={(event, {value}) => dispatch(actions.setSeed(parseInt(value)))}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Disable Console Output'
                                checked={options.disableConsoleOutput}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DISABLE_CONSOLE_OUTPUT))}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Self Defending'
                                checked={options.selfDefending}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SELF_DEFENDING))}/>

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

                            <Divider/>

                            <Form.Checkbox
                                label='Enable Source Map'
                                checked={options.sourceMap}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SOURCEMAP))}/>

                            <Form.Select
                                label='Source Map Mode'
                                value={options.sourceMapMode}
                                disabled={!options.sourceMap}
                                fluid
                                onChange={(event, {value}) => dispatch(actions.setSourceMapMode(value))}
                                options={SOURCEMAP_OPTIONS}/>

                            <Form.Input
                                label='Source Map Base URL'
                                disabled={!options.sourceMap || options.sourceMapMode !== SOURCEMAP_SEPARATE}
                                onChange={(event, {value}) => dispatch(actions.setSourceMapBaseUrl(value))}
                                value={options.sourceMapBaseUrl}
                                placeholder='http://localhost:3000'/>

                            <Form.Input
                                label='Source Map File Name'
                                disabled={!options.sourceMap || options.sourceMapMode !== SOURCEMAP_SEPARATE}
                                onChange={(event, {value}) => dispatch(actions.setSourceMapFileName(value))}
                                value={options.sourceMapFileName}
                                placeholder='example'/>

                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment basic>
                            <Header as='h4'>
                                <Header.Content>
                                    Strings Transformations
                                </Header.Content>
                            </Header>

                            <Divider/>

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

                            <Form.Input
                                type='number'
                                label='String Array Threshold'
                                value={options.stringArrayThreshold}
                                min="0"
                                max="1"
                                step="0.05"
                                onChange={(event, {value}) => dispatch(actions.setStringArrayThreshold(parseFloat(value)))}
                                disabled={!options.stringArrayThresholdEnabled}/>

                            <Form.Input
                                type='number'
                                label='String Array Wrappers Count'
                                value={options.stringArrayWrappersCount}
                                min="0"
                                step="1"
                                onChange={(event, {value}) => dispatch(actions.setStringArrayWrappersCount(parseInt(value)))}
                                disabled={!options.stringArray}/>

                            <Form.Select
                                label='String Array Wrappers Type'
                                fluid
                                placeholder={STRING_ARRAY_WRAPPERS_TYPE_VARIABLE}
                                value={options.stringArrayWrappersType}
                                onChange={(event, {value}) => dispatch(actions.setStringArrayWrappersType(value))}
                                options={STRING_ARRAY_WRAPPERS_TYPE_OPTIONS}
                                disabled={!options.stringArray || !options.stringArrayWrappersCount}
                            />

                            <Form.Checkbox
                                label='String Array Wrappers Chained Calls'
                                checked={options.stringArrayWrappersChainedCalls}
                                disabled={!options.stringArray || !options.stringArrayWrappersCount}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY_WRAPPERS_CHAINED_CALLS))}/>

                            <Form.Select
                                disabled={!options.stringArrayEncodingEnabled}
                                label='String Array Encoding'
                                fluid
                                multiple
                                placeholder={STRING_ARRAY_ENCODING_NONE}
                                value={options.stringArrayEncoding}
                                onChange={(event, {value}) => dispatch(actions.setStringArrayEncoding(value))}
                                options={STRING_ARRAY_ENCODING_OPTIONS}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Split Strings'
                                checked={options.splitStrings}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SPLIT_STRINGS))}/>

                            <Form.Input
                                type='number'
                                label='Split Strings Chunk Length'
                                value={options.splitStringsChunkLength}
                                min="1"
                                step="1"
                                onChange={(event, {value}) => dispatch(actions.setSplitStringsChunkLength(parseInt(value)))}
                                disabled={!options.splitStringsChunkLengthEnabled}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Unicode Escape Sequence'
                                checked={options.unicodeEscapeSequence}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_UNICODE_ESCAPE_SEQUENCE))}/>

                            <Divider/>

                            <EntryInputContainer
                                label='Force Transform Strings'
                                actionAddEntryToState={(string) => dispatch(actions.addForceTransformString(string))}
                                actionRemoveEntryFromState={(string) => dispatch(actions.removeForceTransformString(string))}
                                placeholder="^some *string *or RegExp"
                                entries={options.forceTransformStrings}
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
                            <Header as='h4'>
                                <Header.Content>
                                    Identifiers Transformations
                                </Header.Content>
                            </Header>

                            <Divider/>

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
                                value={options.identifiersPrefix}
                                placeholder=''
                                onChange={(event, {value}) => dispatch(actions.setIdentifiersPrefix(value))}
                            />

                            <Divider/>

                            <Form.Checkbox
                                label='Rename Globals'
                                checked={options.renameGlobals}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_RENAME_GLOBALS))}/>

                            <Form.Checkbox
                                label='Rename Properties'
                                checked={options.renameProperties}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_RENAME_PROPERTIES))}/>

                            <Divider/>

                            <EntryInputContainer
                                label='Reserved Names'
                                actionAddEntryToState={(name) => dispatch(actions.addReservedName(name))}
                                actionRemoveEntryFromState={(name) => dispatch(actions.removeReservedName(name))}
                                placeholder="^someVariable *or *RegExp"
                                entries={options.reservedNames}
                                buttonIcon="plus"/>
                        </Segment>
                    </Grid.Column>

                    <Grid.Column>
                        <Segment basic>
                            <Header as='h4'>
                                <Header.Content>
                                    Other Transformations
                                </Header.Content>
                            </Header>

                            <Divider/>

                            <Form.Checkbox
                                label='Compact'
                                checked={options.compact}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_COMPACT_CODE))}/>

                            <Form.Checkbox
                                label='Simplify'
                                checked={options.simplify}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_SIMPLIFY))}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Transform Object Keys'
                                checked={options.transformObjectKeys}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_TRANSFORM_OBJECT_KEYS))}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Numbers To Expressions'
                                checked={options.numbersToExpressions}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_NUMBERS_TO_EXPRESSIONS))}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Control Flow Flattening'
                                checked={options.controlFlowFlattening}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_CONTROL_FLOW_FLATTENING))}/>

                            <Form.Input
                                type='number'
                                label='Control Flow Flattening Threshold'
                                value={options.controlFlowFlatteningThreshold}
                                min="0"
                                max="1"
                                step="0.1"
                                onChange={(event, {value}) => dispatch(actions.setControlFlowFlatteningThreshold(parseFloat(value)))}
                                disabled={!options.controlFlowFlattening}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Dead Code Injection'
                                checked={options.deadCodeInjection}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_DEAD_CODE_INJECTION))}/>

                            <Form.Input
                                type='number'
                                label='Dead Code Injection Threshold'
                                value={options.deadCodeInjectionThreshold}
                                min="0"
                                max="1"
                                step="0.1"
                                onChange={(event, {value}) => dispatch(actions.setDeadCodeInjectionThreshold(parseFloat(value)))}
                                disabled={!options.deadCodeInjection}/>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </Form>

            <Segment secondary>
                <Header as="h2" id="Options">
                    Available Options:
                </Header>

                <ReactMarkdown
                    source={getOptionsMarkdown()}
                    renderers={{
                        heading: getHeadingRenderer,
                        text: getEmojiSupportRenderer
                    }}
                />
            </Segment>
        </React.Fragment>
    );
};


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
