const hogan = require("hogan.js");
const fs = require("fs");
const fsPath = require("fs-path");
const path = require("path");
const Remarkable = require("remarkable");
const walk = require("walk");

const SRC_DIR = path.resolve(__dirname, '../src');
const DIST_DIR = path.resolve(__dirname, '../docs');

/**
 * Get resources tree
 */
const init = function() {
    let walker = walk.walk(SRC_DIR + "/content", {
        followLinks: true
    });

    walker.on('file', function (root, stat, next) {
        renderCompiledTemplateIntoHTMLFile({
            title: stat.name,
            contentSrc: root + '/' + stat.name
        });

        next();
    });
};

/**
 * Render file
 */
const compileFileTemplate = function(resourceFile) {
    let templateString = fs
        .readFileSync(SRC_DIR + '/template.mustache')
        .toString();
    let template = hogan.compile(templateString);

    let contentSring = fs
        .readFileSync(resourceFile.contentSrc)
        .toString();
    let md = new Remarkable();

    return template.render({
        title: resourceFile.title,
        content: md.render(contentSring)
    });
};

/**
 * Write File on directory
 */
const renderCompiledTemplateIntoHTMLFile = function(resourceFile) {
    console.log(resourceFile)
    let resourceFilePath = resourceFile.contentSrc.replace(
        SRC_DIR + '/content',
        DIST_DIR
    );

    fsPath.writeFile(
        resourceFilePath.replace('.md', '.html'),
        compileFileTemplate(resourceFile),
        function (err) {
            if (err) console.log(err);
            console.log(resourceFile.title + ' rendered!');
        }
    );
};

/**
 * Exec
 */
init();