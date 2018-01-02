/**
 * Result Search Template
 * @type {string}
 */
export const resultSearchTemplate = `
    {{#items}}
    <div class="col-12 col-sm-6 col-md-6 col-lg-4">
        <a href="{{metadata.url}}" class="c-search__resultItem">
            <h2 class="c-search__resultItemTitle">
                <span>{{metadata.title}}</span>
            </h2>
            
            {{#metadata.description}}
            <p class="c-search__resultItemDescription">
                {{metadata.description}}
            </p>
            {{/metadata.description}}
            
            <div class="c-search__resultItemLangList">
                {{#metadata.languages}}
                    <div class="c-search__resultItemLang c-search__resultItemLang--{{.}}">
                        {{.}}
                    </div>
                {{/metadata.languages}}
            </div>
        </a>
    </div>
    {{/items}}
    {{^items}}
    <div class="col-sm-12">
        <div class="c-search__emptyResult">
            <i class="fa fa-times-circle" aria-hidden="true"></i>
            No results found
        </div>
    </div>
    {{/items}}
`;