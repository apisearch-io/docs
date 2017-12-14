const hogan = require("hogan.js");
const fsPath = require("fs-path");
const walk = require("walk");
const path = require("path");
const _ = require("lodash");

const fileToString = require("./helpers").fileToString;
const parseMarkdownFile = require("./helpers").parseMarkdownFile;
const getAssetsRelativePath = require("./helpers").getAssetsRelativePath;
const getFileTargetPath = require("./helpers").getFileTargetPath;

const CONTENT_DIR = path.resolve(__dirname, '../src/content');
const TEMPLATES_DIR = path.resolve(__dirname, '../src/templates');
const SRC_DIR = path.resolve(__dirname, '../src');

/**
 * Main executable function
 */
(function () {
    let walker = walk.walk(CONTENT_DIR, {
        followLinks: false
    });
    let files = [];

    walker.on('file', function (root, stat, next) {
        let systemPath = root + '/' + stat.name;

        /**
         * Parse MD file
         */
        let contentString = fileToString(systemPath);
        let parsedFile = parseMarkdownFile(contentString);

        parsedFile = {
            ...parsedFile,
            systemPath,
            url: '/docs/' + parsedFile.source.replace('.md', '.html'),
            systemName: stat.name,
            assets: getAssetsRelativePath(systemPath)
        };

        /**
         * Create file list
         */
        files.push(parsedFile);

        next();
    });

    walker.on('end', function () {
        console.log(`Writing files...`);

        files.forEach(function(file) {
            /**
             * Compose the tree menu
             */
            let tree = _.groupBy(files, "category");
            let categories = Object.keys(tree);
            let composedMenu = categories
                .map(function(category) {
                    if ("null" === category) {
                        return {
                            has_category: false,
                            children: tree["null"]
                        }
                    }

                    return {
                        category_name: category,
                        has_category: true,
                        children: _.orderBy(tree[category], "page")
                    }
                });

            /**
             * Render data
             */
            let targetFile = getFileTargetPath(file.systemPath);
            let html = renderTemplate({
                ...file,
                menu: composedMenu
            });

            /**
             * Write file
             */
            writeFileInPublicFolder(targetFile, html);
        });

        /**
         * Create a Json data file
         * for the documentation search
         */
        createDataFile(files);
    })
})();

/**
 * Write File on directory
 */
const writeFileInPublicFolder = function(targetFile, html) {
    fsPath.writeFile(
        targetFile,
        html,
        function (err) {
            if (err) {
                console.log(`X --> ${targetFile}`);
            }

            console.log(`V --> ${targetFile}`);
        }
    );
};

/**
 * Render data into template
 */
const renderTemplate = function(parsedFile) {
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

const createDataFile = function(docsList) {
    let targetFile = `${SRC_DIR}/docs.json`;
    fsPath.writeFile(
        targetFile,
        JSON.stringify(docsList),
        function (err) {
            if (err) {
                console.log(`X --> ${err}`);
            }

            console.log(`V --> Docs database created`);
        }
    );
};