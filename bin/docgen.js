const fileToString = require("./helpers").fileToString;
const parseMarkdownFile = require("./helpers").parseMarkdownFile;

const hogan = require("hogan.js");
const fsPath = require("fs-path");
const path = require("path");
const walk = require("walk");


const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const TEMPLATES_DIR = path.resolve(__dirname, '../src/templates');
const DIST_DIR = path.resolve(__dirname, '../docs');

/**
 * Get resources tree
 */
function main() {
    let walker = walk.walk(CONTENT_DIR, {
        followLinks: true
    });

    walker.on('file', function (root, stat, next) {
        renderCompiledTemplateIntoHTMLFile({
            name: stat.name,
            path: root + '/' + stat.name
        });

        next();
    });
}

const compileFileTemplate = function(file) {
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
    return template.render(parsedFile);
};

/**
 * Write File on directory
 */
const renderCompiledTemplateIntoHTMLFile = function(file) {
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
 * Exec
 */
main();