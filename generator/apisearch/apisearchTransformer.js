const codeBlocks = require('gfm-code-blocks');
const _ = require("lodash");
const uslug = require("uslug");

/**
 * Apisearch transformer
 * from docSection to item
 *
 * @param docSection
 */
function apisearchTransformer(docSection) {
    let code = codeBlocks(docSection.string);

    return {
        uuid: {
            id: `${docSection.level}-${uslug(docSection.title)}`,
            type: `${uslug(docSection.parentMetadata.category)}`
        },
        metadata: {
            url: `${docSection.parentMetadata.url}#${uslug(docSection.title)}`,
            title: docSection.title,
            content: docSection.body,
            category: docSection.parentMetadata.category,
            description: `${docSection.body.substring(0, 50)}...`,
            languages: docSection.parentMetadata.languages,
            code: (code.length !== 0)
                ? code.map(block => block)
                : null
            ,
        },
        searchable_metadata: {
            title: docSection.title,
            content: docSection.body,
            tags: docSection.parentMetadata.tags,
            languages: docSection.parentMetadata.languages,
            code: (code.length !== 0)
                ? code.map(block => block.code)
                : null
        }
    }
}

module.exports = apisearchTransformer;