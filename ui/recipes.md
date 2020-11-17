## Multiple UI instances

You can work with several UI instances at the same time. For example, in case
you want to work with 2 search instances, initialization will depend on how you
want to configure them.

In case you want two different UI instances with different configurations, you
will need to create two independent UI objects.

```javascript
const firstUI = apisearchUI.create({
    app_id: 'an_app_id',
    index_id: 'an_index_id',
    token: 'a_token'
});

const secondUI = apisearchUI.create({
    app_id: 'another_app_id',
    index_id: 'another_index_id',
    token: 'another_token'
});
```

In case you want to create two different UI instances with the same
configuration, you can use the factory object to create replicas of the same UI.

```javascript
const UIFactory = apisearchUI.factory({
    app_id: 'an_app_id',
    index_id: 'an_index_id',
    token: 'a_token'
});

const firstUI = UIFactory.createUI();
const secondUI = UIFactory.createUI();
```

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
this completion. As soon as the suggestion appears in the search bar, you can 
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

## Infinite scrolling

What if you don't even need a pagination to reach all your result items? What if
just scrolling down should be enough? Well. This is actually possible with 
Apisearch by just defining your results widget as such.

Possible values for this feature are:

- infiniteScroll: **false** // Disable this feature
- infiniteScroll: **true**  // Enable this feature with default behavior
- infiniteScroll: **200**   // Number of pixels before the results layer end where
to call next page. Values can go from 0 (default behavior) to N. Test the best
number for your case

<div class="row">
    <div class="col-lg-8 col-md-6 col-sm-12">
        <pre v-pre="" data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
        clearSearch: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 20,
        infiniteScroll: 200
    }),
);</code></pre>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
        <iframe loading="lazy" src="/_iframe/search-input.html?num-results=20&as-grid=1&first-query=1&infinite-scroll=1" style="height: 423px;"></iframe>
    </div>
</div>

## Suggestions in results
## Take first search from query