const Remarkable = require("remarkable");
const meta = require("remarkable-meta");
const fs = require("fs");
const path = require("path");
const CONTENT_DIR = path.resolve(__dirname, '../src/content');

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

function getAssetsRelativePath(file) {
    let arrayFilePath = file.path
        .replace(CONTENT_DIR, "")
        .split("/")
    ;
    let trimmedFilePath = arrayFilePath.slice(1, arrayFilePath.length);

    let assetsRelativePath = trimmedFilePath.map(function(folder, index) {
        if (index > 0) {
            return "../";
        }

        return "./";
    });

    return assetsRelativePath.join("") + "assets";
}

module.exports = {
    parseMarkdownFile,
    fileToString,
    getAssetsRelativePath
};