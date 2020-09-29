const emojiDictionary = require('emoji-dictionary');

export const getEmojiSupportRenderer = (text) => {
    return text
        .value
        .replace(
            /:\w+:/gi,
            (name) => emojiDictionary.getUnicode(name)
        );
};