import apisearchUI from "apisearch-ui";

const topicsSearchResultTemplate = `
    {{#items}}
    <li>
        <strong>
            <a href="{{metadata.url}}">{{metadata.title}}</a>
        </strong>
        <p>{{metadata.description}}</p>
    </li>
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
        autofocus: true,
        classNames: {
            container: '',
            input: 'c-search__searchInput form-control mr-sm-2',
            clearSearch: 'c-search__clearSearch'
        },
        template: {
            clearSearch: '<span class="fa fa-times-circle-o"></span>'
        }
    }),
    ui.widgets.result({
        target: '#topicsSearchResult',
        itemsPerPage: 3,
        template: {
            itemsList: topicsSearchResultTemplate,
        }
    }),
    ui.widgets.result({
        target: '#topicsSearchResult',
        itemsPerPage: 3,
        template: {
            itemsList: topicsSearchResultTemplate,
        },
        formatData: (item) => {
            return item;
        }
    })
);

ui.store.on('render', () => {
    document
        .getElementById('searchResult')
        .classList
        .remove('d-none');
});

export default ui;