import React from 'react';
const fullReadmeMarkdown = require('javascript-obfuscator/README.md').default;
const emojiDictionary = require('emoji-dictionary');

function flatten(text, child) {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text)
}

export function headingRenderer(props) {
    const children = React.Children.toArray(props.children)
    const text = children.reduce(flatten, '')
    const slug = text.toLowerCase().replace(/\W/g, '-')
    
    return React.createElement('h' + props.level, {id: slug}, props.children)
}

export const emojiSupportRenderer = text => text.value.replace(/:\w+:/gi, name => emojiDictionary.getUnicode(name));

export function getOptionsMarkdown() {
    return fullReadmeMarkdown
        .split('<!-- ##options-start## -->')[1]
        .split('<!-- ##options-end## -->\n')[0];
}