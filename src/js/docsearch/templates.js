/**
 * Result Search Template
 * @type {string}
 */
export const resultSearchTemplate = `
    {{#items}}
    <div class="col-12 col-sm-6 col-md-6 col-lg-4">
        <a href="{{metadata.url}}" onclick="window.location.reload(true)" class="c-search__resultItem">
            <h2 class="c-search__resultItemTitle">
                <span>{{metadata.title}}</span>
                
                <span class="c-search__resultItemCategory">
                    {{metadata.category}}
                </span>
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
            <i class="fa fa-meh-o" aria-hidden="true"></i>
            <h2 class="c-search__emptyResultTitle">No results found</h2>
            
            <ul class="c-search__emptyResultSuggestions">
                <li class="c-search__emptyResultSuggestion">
                    Maybe you need <a href="http://localhost:1234/docs/first-steps.html"> a starting point</a>, 
                </li>
                <li class="c-search__emptyResultSuggestion">
                    <a href="http://localhost:1234/docs/integrations.html">see the Api Reference</a>, 
                </li>
                <li class="c-search__emptyResultSuggestion">
                    <a href="http://localhost:1234/docs/ui.html">build a custom search</a>.
                </li>
            </ul>
        </div>
    </div>
    {{/items}}
`;