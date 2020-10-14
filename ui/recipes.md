## Autocomplete input

You can autocomplete your user queries by exposing some suggestions per indexed
item. It's important to understand that if these items have not suggestions,
even if you enable this feature, you'll find nothing as results.

```json
{
    "uuid": {
        "id": "mw0001379083",
        "type": "album"
    },
    "searchable_metadata": {
        "title": "Michael Jackson's This Is It"
    },
    "suggest": {
        "title": "Michael Jackson's This Is It"
    }
}
```

As soon as you have indexed items with some suggestions, as it's shown here in
this last example, then it's time to add this feature in our `InputWidget`
settings. Internally, this feature requires 1 suggestion from the server to make
this completition. As soon as the suggestion appears in the search bar, you can 
press `tab` or `right` keys to apply the proposed word.

<div class="row">
    <div class="col-lg-8 col-md-6 col-sm-12">
        <pre v-pre="" data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
        autocomplete: true,
        clearSearch: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 8
    }),
);</code></pre>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?with-autocomplete=true&num-results=8&as-grid=1&first-query=1" style="height: 423px;"></iframe>
    </div>
</div>

## Suggestions in results
## Take first search from query