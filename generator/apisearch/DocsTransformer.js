"use strict";
exports.__esModule = true;
var uslug = require("uslug");
var codeBlocks = require("gfm-code-blocks");
var apisearch_1 = require("apisearch");
var docsTransformer = /** @class */ (function () {
    function DocsTransformer() {
    }
    /**
     * Is an indexable object.
     *
     * @param object
     *
     * @return {boolean}
     */
    DocsTransformer.prototype.isValidObject = function (object) {
        return true;
    };
    /**
     * Create item by object.
     *
     * @param object
     *
     * @return {Item}
     */
    DocsTransformer.prototype.toItem = function (object) {
        var code = codeBlocks(object.string);
        return apisearch_1.Item.create(this.toItemUUID(object), {
            url: object.parentMetadata.url + "#" + uslug(object.title),
            title: object.title,
            content: object.body,
            category: object.parentMetadata.category,
            description: object.body.substring(0, 50) + "...",
            languages: object.parentMetadata.languages,
            code: (code.length !== 0)
                ? code.map(function (block) { return block; })
                : null
        }, {}, {
            title: object.title,
            content: object.body,
            tags: object.parentMetadata.tags,
            languages: object.parentMetadata.languages,
            code: (code.length !== 0)
                ? code.map(function (block) { return block.code; })
                : null
        });
    };
    /**
     * Create item UUID by object.
     *
     * @param object
     *
     * @return {ItemUUID}
     */
    DocsTransformer.prototype.toItemUUID = function (object) {
        return new apisearch_1.ItemUUID(object.level + "-" + uslug(object.title), "" + uslug(object.parentMetadata.category));
    };
    return DocsTransformer;
}());
exports["default"] = new docsTransformer();
