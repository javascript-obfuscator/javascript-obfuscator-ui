import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
const ReactMarkdown = require('react-markdown')

import {Form, Grid, Header, Segment, Divider, Button} from 'semantic-ui-react';

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

export const RENAME_PROPERTIES_MODE_SAFE = 'safe';
export const RENAME_PROPERTIES_MODE_UNSAFE = 'unsafe';

const RENAME_PROPERTIES_MODE_OPTIONS = [
    {text: 'Safe', value: RENAME_PROPERTIES_MODE_SAFE},
    {text: 'Unsafe', value: RENAME_PROPERTIES_MODE_UNSAFE},
];

export const SOURCEMAP_INLINE = 'inline';
export const SOURCEMAP_SEPARATE = 'separate';

const SOURCEMAP_OPTIONS = [
    {text: 'Inline', value: SOURCEMAP_INLINE},
    {text: 'Separate', value: SOURCEMAP_SEPARATE},
];

export const STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMBER = 'hexadecimal-number';
export const STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMERIC_STRING = 'hexadecimal-numeric-string';

const STRING_ARRAY_INDEXES_TYPE_OPTIONS = [
    {text: 'Hexadecimal Number', value: STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMBER},
    {text: 'Hexadecimal Numeric String', value: STRING_ARRAY_INDEXES_TYPE_HEXADECIMAL_NUMERIC_STRING}
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

export const DOMAIN_LOCK_REDIRECT_URL_ABOUT_BLANK = 'about:blank';

const shouldShowAd = (level, headingIndex) => {
    if (level !== 3) {
        return false
    }

    if (headingIndex === null) {
        return false;
    }

    if (headingIndex === 0) {
        return false;
    }

    if (headingIndex === 5) {
        return true;
    }

    return headingIndex % 14 === 0;
}

const Options = ({dispatch, options}) => {
    const headingCounter = useRef(0)
    const readmeAdCounter = useRef(0)

    headingCounter.current = 0
    readmeAdCounter.current = 0

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

                            <Form.Input
                                type='number'
                                label='Debug Protection Interval'
                                value={options.debugProtectionInterval}
                                min="0"
                                step="1000"
                                onChange={(event, {value}) => dispatch(actions.setDebugProtectionInterval(parseInt(value)))}
                                disabled={!options.debugProtection}/>

                            <Divider/>

                            <Form.Checkbox
                                label='Ignore Imports'
                                checked={options.ignoreImports}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_IGNORE_IMPORTS))}/>

                            <Divider/>

                            <EntryInputContainer
                                label='Domain lock'
                                disabled={!options.domainLockEnabled}
                                actionAddEntryToState={(domain) => dispatch(actions.addDomainLock(domain))}
                                actionRemoveEntryFromState={(domain) => dispatch(actions.removeDomainLock(domain))}
                                placeholder="domain.com"
                                entries={options.domainLock}
                                buttonIcon="plus"/>

                            <Form.Input
                                type='string'
                                label='Domain Lock Redirect Url'
                                value={options.domainLockRedirectUrl}
                                onChange={(event, {value}) => dispatch(actions.setDomainLockRedirectUrl(value))}/>

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
                                label='String Array Rotate'
                                checked={options.stringArrayRotate}
                                disabled={!options.stringArrayRotateEnabled}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY_ROTATE))}/>

                            <Form.Checkbox
                                label='String Array Shuffle'
                                checked={options.stringArrayShuffle}
                                disabled={!options.stringArrayShuffleEnabled}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY_SHUFFLE))}/>

                            <Form.Input
                                type='number'
                                label='String Array Threshold'
                                value={options.stringArrayThreshold}
                                min="0"
                                max="1"
                                step="0.05"
                                onChange={(event, {value}) => dispatch(actions.setStringArrayThreshold(parseFloat(value)))}
                                disabled={!options.stringArrayThresholdEnabled}/>

                            <Form.Checkbox
                                label='String Array Index Shift'
                                checked={options.stringArrayIndexShift}
                                disabled={!options.stringArray}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY_INDEX_SHIFT))}/>

                            <Form.Select
                                disabled={!options.stringArrayIndexesType}
                                label='String Array Indexes Type'
                                fluid
                                multiple
                                placeholder="Select indexes type type"
                                value={options.stringArrayIndexesType}
                                onChange={(event, {value}) => dispatch(actions.setStringArrayIndexesType(value))}
                                options={STRING_ARRAY_INDEXES_TYPE_OPTIONS}/>

                            <Form.Checkbox
                                label='String Array Calls Transform'
                                checked={options.stringArrayCallsTransform}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_STRING_ARRAY_CALLS_TRANSFORM))}/>

                            <Form.Input
                                type='number'
                                label='String Array Calls Transform Threshold'
                                value={options.stringArrayCallsTransformThreshold}
                                min="0"
                                max="1"
                                step="0.1"
                                onChange={(event, {value}) => dispatch(actions.setStringArrayCallsTransformThreshold(parseFloat(value)))}
                                disabled={!options.stringArrayCallsTransform}/>

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

                            <Form.Input
                                type='number'
                                label='String Array Wrappers Parameters Maximum Count'
                                value={options.stringArrayWrappersParametersMaxCount}
                                min="2"
                                step="1"
                                onChange={(event, {value}) => dispatch(actions.setStringArrayWrappersParametersMaxCount(parseInt(value)))}
                                disabled={
                                    !options.stringArray
                                    || !options.stringArrayWrappersCount
                                    || options.stringArrayWrappersType !== STRING_ARRAY_WRAPPERS_TYPE_FUNCTION
                                }/>

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

                            <Divider/>

                            <Form.Checkbox
                                label='Rename Properties'
                                checked={options.renameProperties}
                                onChange={() => dispatch(actions.toggleOption(types.TOGGLE_RENAME_PROPERTIES))}/>

                            <Form.Select
                                label='Rename Properties Mode'
                                value={options.renamePropertiesMode}
                                disabled={!options.renameProperties}
                                fluid
                                onChange={(event, {value}) => dispatch(actions.setRenamePropertiesMode(value))}
                                options={RENAME_PROPERTIES_MODE_OPTIONS}/>

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
