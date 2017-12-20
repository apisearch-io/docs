const fs = require("fs");
const path = require("path");
const MarkdownParser = require("./parser/MarkdownParser")

const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const DIST_DIR = path.resolve(__dirname, '../docs');
const PARTIALS_DIR = path.resolve(__dirname, '../src/templates/_partials');

function fileToString(fileAbsolutePath) {
    return fs
        .readFileSync(fileAbsolutePath, 'utf-8')
        .toString();
}

function getFileTargetPath(fileSystemPath) {
    return fileSystemPath
        .replace(CONTENT_DIR, DIST_DIR)
        .replace('.md', '.html');
}

function parseMarkdownFile(contentString) {
    let parser = new MarkdownParser(contentString);

    let meta = parser.getMeta();
    let tableOfContent = parser.getJsonFormattedTOC();
    let content = parser.getHtml();

    return {
        ...meta,
        tableOfContent,
        content
    };
}

function loadPartials() {
    return {
        head: fileToString(PARTIALS_DIR + '/head.mustache'),
        header: fileToString(PARTIALS_DIR + '/header.mustache'),
        search_result: fileToString(PARTIALS_DIR + '/search-result.mustache'),
        sidebar: fileToString(PARTIALS_DIR + '/sidebar.mustache'),
        footer: fileToString(PARTIALS_DIR + '/footer.mustache')
    }
}

function getAssetsRelativePath(fileSystemPath) {
    let arrayFilePath = fileSystemPath
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
    loadPartials,
    getFileTargetPath,
    getAssetsRelativePath
};