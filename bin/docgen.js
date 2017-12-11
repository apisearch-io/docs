const hogan = require("hogan.js");
const fsPath = require("fs-path");
const path = require("path");
const walk = require("walk");

const fileToString = require("./helpers").fileToString;
const parseMarkdownFile = require("./helpers").parseMarkdownFile;

/**
 * Constants
 */
const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const TEMPLATES_DIR = path.resolve(__dirname, '../src/templates');
const DIST_DIR = path.resolve(__dirname, '../docs');


const compileFileTemplate = function(file) {
    let arrayFilePath = file.path
        .replace(CONTENT_DIR, "")
        .split("/");
    let trimmedFilePath = arrayFilePath.slice(1, arrayFilePath.length);
    let assetsRelativePath = trimmedFilePath.map(function() {
        // WIP
    });
    console.log(assetsRelativePath);
    /**
     * Get markdown and parse its content
     */
    let contentString = fileToString(file.path);
    let parsedFile = parseMarkdownFile(contentString);

    /**
     * Get file template and compile it
     */
    let templateString = fileToString(
        `${TEMPLATES_DIR}/${parsedFile.template}`
    );
    let template = hogan.compile(templateString);

    /**
     * Rendered template with the content
     */
    return template.render({
        ...parsedFile
    });
};

/**
 * Write File on directory
 */
const createDocFile = function(file) {
    let targetFile = file.path
        .replace(CONTENT_DIR, DIST_DIR)
        .replace('.md', '.html');
    let htmlContent = compileFileTemplate(file);

    fsPath.writeFile(
        targetFile,
        htmlContent,
        function (err) {
            if (err) {
                console.log(err);
            }

            console.log(file.name + ' rendered!');
        }
    );
};

/**
 * Main executable function
 */
(function () {
    let walker = walk.walk(CONTENT_DIR, {
        followLinks: true
    });

    walker.on('file', function (root, stat, next) {
        createDocFile({
            name: stat.name,
            path: root + '/' + stat.name
        });

        next();
    });
})();