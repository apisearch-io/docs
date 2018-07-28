import apisearch from "apisearch";
import docsTransformer from "./DocsTransformer";
import * as apisearchConfig from "../../apisearch-config.js";
import * as apisearchAdminConfig from "../../apisearch-admin-config.js";


export function indexSection(section) : Promise<any> {
    console.log(apisearchAdminConfig);
    console.log(apisearchConfig);
    const repository = apisearch.createRepository({
        app_id: apisearchConfig.app_id,
        index_id: apisearchConfig.index_id,
        token: apisearchAdminConfig.admin_token,
        options: {
            endpoint: apisearchConfig.query_hostname
        }
    });

    repository
        .getTransformer()
        .addWriteTransformer(docsTransformer);

    repository.addObject(section);
    return repository.flush();
}
