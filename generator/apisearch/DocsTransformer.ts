import * as uslug from "uslug";
import * as codeBlocks from 'gfm-code-blocks';
import {WriteTransformer, Item, ItemUUID} from "apisearch";


const docsTransformer = class DocsTransformer implements WriteTransformer {

    /**
     * Is an indexable object.
     *
     * @param object
     *
     * @return {boolean}
     */
    isValidObject(object: any): boolean {
        return true;
    }

    /**
     * Create item by object.
     *
     * @param object
     *
     * @return {Item}
     */
    toItem(object): Item {
        let code = codeBlocks(object.string);

        return Item.create(
            this.toItemUUID(object),
            {
                url: `${object.parentMetadata.url}#${uslug(object.title)}`,
                title: object.title,
                content: object.body,
                category: object.parentMetadata.category,
                description: `${object.body.substring(0, 50)}...`,
                languages: object.parentMetadata.languages,
                code: (code.length !== 0)
                    ? code.map(block => block)
                    : null
                ,
            },
            {},
            {
                title: object.title,
                content: object.body,
                tags: object.parentMetadata.tags,
                languages: object.parentMetadata.languages,
                code: (code.length !== 0)
                    ? code.map(block => block.code)
                    : null
            }
        );
    }

    /**
     * Create item UUID by object.
     *
     * @param object
     *
     * @return {ItemUUID}
     */
    toItemUUID(object): ItemUUID {
        return new ItemUUID(
            `${object.level}-${uslug(object.title)}`,
            `${uslug(object.parentMetadata.category)}`
        );
    }
};

export default new docsTransformer();