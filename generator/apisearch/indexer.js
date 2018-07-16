"use strict";
exports.__esModule = true;
var apisearch_1 = require("apisearch");
var DocsTransformer_1 = require("./DocsTransformer");
var apisearchConfig = require("../../apisearch-config.js");
function indexSection(section) {
    var repository = apisearch_1["default"].createRepository({
        app_id: apisearchConfig.app_id,
        index_id: apisearchConfig.index_id,
        token: apisearchConfig.admin_token,
        options: {
            endpoint: apisearchConfig.admin_hostname
        }
    });
    repository
        .getTransformer()
        .addWriteTransformer(DocsTransformer_1["default"]);
    repository.addObject(section);
    return repository.flush();
}
exports.indexSection = indexSection;
