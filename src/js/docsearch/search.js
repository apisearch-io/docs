import apisearchUI from "apisearch-ui";
import {resultSearchTemplate} from "./templates";

const apisearchConfig = require("../../../apisearch-config");

const ui = apisearchUI({
    appId: apisearchConfig.appId,
    index: apisearchConfig.index,
    token: apisearchConfig.queryToken,
    options: {
        endpoint: apisearchConfig.hostname,
        protocol: apisearchConfig.protocol
    }
});

ui.addWidgets(
    ui.widgets.simpleSearch({
        target: '#searchInput',
        placeholder: 'Search documentation...',
        autofocus: true,
        highlightsEnabled: true,
        classNames: {
            container: '',
            input: 'c-search__searchInput form-control mr-sm-2',
            clearSearch: 'c-search__clearSearch'
        },
        template: {
            clearSearch: '<span class="fa fa-times"></span>'
        }
    }),
    ui.widgets.result({
        target: '#topicsSearchResult',
        itemsPerPage: 12,
        template: {
            itemsList: resultSearchTemplate,
        },
        classNames: {
            itemsList: 'row'
        }
    })
);

ui.store.on('render', function () {
    let resultBox = document
        .querySelector('#searchResult')
        .classList
    ;

    if (this.dirty) {
        return;
    }

    if (this.currentQuery.q === '') {
        resultBox.add('d-none');
        return;
    }

    resultBox.remove('d-none');
});


export default ui;