import apisearchUI from "apisearch-ui";
import {resultSearchTemplate} from "./templates";

const apisearchConfig = require("../../../apisearch-config");

const ui = apisearchUI.create({
    app_id: apisearchConfig.app_id,
    index_id: apisearchConfig.index_id,
    token: apisearchConfig.query_token,
    options: {
        endpoint: apisearchConfig.query_hostname
    }
});

ui.addWidgets(
    ui.widgets.searchInput({
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
            itemsList: resultSearchTemplate
        },
        classNames: {
            itemsList: 'row'
        }
    })
);

ui.attach('render', function () {
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