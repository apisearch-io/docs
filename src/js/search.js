import apisearchUI from "apisearch-ui";
import _ from "lodash";
import {createContentPreview} from "./helpers";

const topicsSearchResultTemplate = `
    {{#items}}
    <div class="col-12 col-sm-6 col-md-6 col-lg-4">
        <div class="c-search__resultItem">
            <h2 class="c-search__resultItemTitle">
                <a href="{{metadata.url}}">{{metadata.title}}</a>
                
                <div class="c-search__resultItemLangList">
                {{#metadata.languages}}
                    <div class="c-search__resultItemLang c-search__resultItemLang--{{.}}">
                        {{.}}
                    </div>
                {{/metadata.languages}}
                </div>
            </h2>
            <p class="c-search__resultItemDescription">{{metadata.description}}</p>
            
            {{#metadata.preview}}
            <a class="c-search__resultItemFoundInContent" href="{{metadata.url}}">
                <b>Found in content:</b>
                <p>{{{metadata.preview}}}</p>
            </a>
            {{/metadata.preview}}
            
            <div class="row">
                {{#metadata.toc}}
                    <div class="col-sm-6 mb-2">
                        <a class="c-search__resultItemAnchor" href="{{metadata.url}}#{{slug}}">
                            <i class="fa fa-link" aria-hidden="true"></i>
                            {{content}}
                        </a>
                    </div>
                {{/metadata.toc}}
            </div>
        </div>
    </div>
    {{/items}}
    
    {{^items}}
    <div class="col-sm-12">
        <div class="c-search__resultItem">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            No results found
        </div>
    </div>
    {{/items}}
`;

const ui = apisearchUI({
    appId: 'apisearch_docs',
    index: 'default',
    token: 'd6aed983-d558-46da-9aca-c3ded7d33313',
    options: {
        endpoint: 'localhost:8999'
    }
});

ui.addWidgets(
    ui.widgets.simpleSearch({
        target: '#searchInput',
        placeholder: 'Search api',
        startSearchOn: 2,
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
            itemsList: topicsSearchResultTemplate,
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
    if (this.dirty) {
        return;
    }

    document
        .querySelector('#searchResult')
        .classList
        .remove('d-none')
    ;
});


export default ui;