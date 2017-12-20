const hljs = require('highlight.js');

const config = {
    html: true,
    langPrefix:'language-',
    typographer: true,
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (__) {}

        return '';
    }
};

module.exports = config;