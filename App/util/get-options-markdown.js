const fullReadmeMarkdown = require('javascript-obfuscator/README.md').default;

export function getOptionsMarkdown() {
    return fullReadmeMarkdown
        .split('<!-- ##options-start## -->')[1]
        .split('<!-- ##options-end## -->\n')[0];
}