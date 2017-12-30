import apisearchUI from "apisearch-ui";
import _ from "lodash";
import {createContentPreview} from "./helpers";
import {resultSearchTemplate} from "./templates";

const apisearchConfig = require("../../../apisearch-config");

const ui = apisearchUI({
    appId: apisearchConfig.appId,
    index: apisearchConfig.index,
    token: apisearchConfig.token,
    options: {
        endpoint: apisearchConfig.hostname
    }
});

ui.addWidgets(
    ui.widgets.simpleSearch({
        target: '#searchInput',
        placeholder: 'Search documentation...',
        autofocus: true,
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
        itemsPerPage: 6,
        template: {
            itemsList: resultSearchTemplate,
        },
        classNames: {
            itemsList: 'row'
        },
        formatData: item => {
            let queryText = document
                    .querySelector(".as-simpleSearch__input")
                    .value,
                content =  item.metadata.content
            ;
            let preview = createContentPreview(queryText, content);

            return {
                ...item,
                metadata: {
                    ...item.metadata,
                    toc: _.slice(item.metadata.toc, 0, 6),
                    preview
                }
            }
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