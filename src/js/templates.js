/**
 * Result Search Template
 * @type {string}
 */
export const resultSearchTemplate = `
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