const codeBlocks = require('gfm-code-blocks');
const _ = require("lodash");

/**
 * Apisearch transformer
 * from doc to item
 *
 * @param docsArray
 */
function apisearchTransformer(docsArray) {
    return docsArray.map(function(doc) {
        let toc = _.groupBy(
            doc.tableOfContent,
            "lvl"
        );
        let code = codeBlocks(doc.originalContent);

        return {
            uuid: {
                id: doc.page,
                type: doc.source
            },
            metadata: {
                url: doc.url,
                title: doc.title,
                description: doc.description,
                category: doc.category,
                content: doc.content,
                languages: doc.languages,
                code: (code.length !== 0)
                    ? code.map(block => block)
                    : null
                ,
                toc: doc.tableOfContent
            },
            searchable_metadata: {
                title: doc.title,
                description: doc.description,
                content: doc.content,
                h1: (typeof toc['1'] !== "undefined")
                    ? toc['1'].map(h => h.content)
                    : null
                ,
                h2: (typeof toc['2'] !== "undefined")
                    ? toc['2'].map(h => h.content)
                    : null
                ,
                h3: (typeof toc['3'] !== "undefined")
                    ? toc['3'].map(h => h.content)
                    : null
                ,
                code: (code.length !== 0)
                    ? code.map(block => block.code)
                    : null
            }
        }
    });
}

module.exports = apisearchTransformer;