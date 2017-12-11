const hogan = require("hogan.js");
const fs = require("fs");
const fsPath = require("fs-path");
const path = require("path");
const Remarkable = require("remarkable");
const meta = require('remarkable-meta');
const walk = require("walk");

const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const TEMPLATES_DIR = path.resolve(__dirname, '../src/templates');
const DIST_DIR = path.resolve(__dirname, '../docs');

/**
 * Get resources tree
 */
const init = function() {
    let walker = walk.walk(CONTENT_DIR, {
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
        .readFileSync(TEMPLATES_DIR + '/one-column.mustache', 'utf-8')
        .toString();
    let template = hogan.compile(templateString);

    let contentSring = fs
        .readFileSync(resourceFile.contentSrc, 'utf-8')
        .toString();
    let md = new Remarkable();
    md.use(meta);

    return template.render({
        title: resourceFile.title,
        content: md.render(contentSring)
    });
};

/**
 * Write File on directory
 */
const renderCompiledTemplateIntoHTMLFile = function(resourceFile) {
    let resourceFilePath = resourceFile.contentSrc.replace(
        CONTENT_DIR,
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