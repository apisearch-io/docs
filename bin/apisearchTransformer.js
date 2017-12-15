const codeBlocks = require('gfm-code-blocks');

/**
 * Apisearch transformer
 * from doc to item
 *
 * @param docsArray
 */
function apisearchTransformer(docsArray) {
    return docsArray.map(function(doc) {
        console.log(codeBlocks(doc.originalContent));

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
                code: ''
            },
            searchable_metadata: () => {
                return {
                    h1: '',
                    h2: '',
                    h3: ''
                }
            }
        }
    });
}

module.exports = apisearchTransformer;