const axios = require("axios");

const apisearchConfig = require("../../apisearch-config");

function indexData(docsString) {
    let encodedData = encodeURIComponent(docsString);
    let api = apisearchConfig;
    let url = `http://${api.hostname}/v1/items?app_id=${api.appId}&index=${api.index}&token=${api.token}`;

    return axios.post(url, `items=${encodedData}`, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}

module.exports = indexData;