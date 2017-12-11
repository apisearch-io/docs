const Remarkable = require("remarkable");
const meta = require("remarkable-meta");
const fs = require("fs");

function fileToString(fileAbsolutePath) {
    return fs
        .readFileSync(fileAbsolutePath, 'utf-8')
        .toString();
}

function parseMarkdownFile(contentString) {
    let md = new Remarkable();
    md.use(meta);

    let content = md.render(contentString);

    return {
        ...md.meta,
        content
    };
}

module.exports = {
    parseMarkdownFile,
    fileToString
};