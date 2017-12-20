const Remarkable = require("remarkable");
const MarkdownIt = require("markdown-it");
const config = require("./config");

const headingAnchor = require("markdown-it-headinganchor");
const meta = require("remarkable-meta");
const toc = require('markdown-toc');
const uslug = require("uslug");

class MarkdownParser {
    constructor(content) {
        this.content = content;
    }

    getMeta() {
        let md = new Remarkable(config);
        md.use(meta);
        md.render(this.content);

        return md.meta;
    }

    getJsonFormattedTOC() {
        let md = new Remarkable(config);
        md.use(toc.plugin({
            slugify: uslug
        }));

        return md.render(this.content).json;
    }

    getHtml() {
        let md = new MarkdownIt(config);
        md.use(meta);
        md.use(headingAnchor, {
            anchorClass: 'fa fa-link',
            slugify: uslug
        });

        return md.render(this.content);
    }
}

module.exports = MarkdownParser;