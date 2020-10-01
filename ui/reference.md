## Apisearch UI

This UI instance will be considered the wrapper object of our configuration, and
will never have any widget specific setting. Only connection values and common
settings.

```javascript
const ui = apisearchUI.create({
    app_id: string,
    index_id: string,
    token: string,
    user_id: string,
    coordinate: {
        lat: float,
        lon: float
    },
    options: {
        endpoint: string,
        api_version?: string,
        timeout?: number,
        override_queries?: boolean,
        cache?: KeyValueCache,
        http_client?: HttpClient,
    },
});
```

First block of setings are basically for authorization. You have to define 
where your index/indices will be found, and how to reach them.

> It is important to always use an only-Query token for that purpose. This token
> will be visible in your website, and should never have administration
> permissions.

```javascript
app_id: string,
index_id: string,
token: string,
```

You can define as well who is the user and where is requesting Apisearch from.
Both are optional. User ID can be set by using your user ID if this one is
logged, a session ID otherwise, or a simple IP. Choose wisely depending on your
needs.

```javascript
user_id: string,
coordinate: {
    lat: float,
    lon: float
},
```

Finally, you can define some client options by using `options`.

```javascript
options: {
    endpoint: string,
    api_version?: string,
    timeout?: number,
    override_queries?: boolean,
    cache?: KeyValueCache,
    http_client?: HttpClient,
},
```

- endpoint: Where the Apisearch server instance is? Must be a full defined URL, 
including http[s]://
- api_version: Used Apisearch api version. By default, `v1`;
- timeout: number of milliseconds to consider an Apisearch request a failed one.
By default, 5000 milliseconds.
- override_queries: Cancel previous query if there's a new one being processed.
That happens when someone writes in a query input fast enough. By default `true`
- cache: Used cache class. By default `KeyValueCache`
- http_client: Used http client class. By default `HttpClient`

## Widgets

Each part of your search environment will be defined in a separated block. Each
filter, each block like sortBy, pagination, even the search input or the
results' container.

Each widget has a specific purpose as it's detailed here.

## Search Input

The search input widget is specifically designed to perform text based searches.
Will be your principal real-time search input field. This widget points to 
searchable_metadata and exact_matching_metadata field of the indexed items.

```javascript
const searchInputWidget = ui.widgets.searchInput({ 
    target: !string,
    placeholder: ?string,
    autofocus: ?bool[false],
    initialSearch: ?string,
    startSearchOn: ?integer[0],
    clearSearch: ?bool[true],
    withContainer: ?bool[true],
    classNames: {
        container: ?string,
        input: ?string,
        clearSearch: ?string
    },
    template: {
        clearSearch: ?string
    }
});
```

Parameters:

* target: is the dom selector, it can be an ID, or a class. This setting is
mandatory
* placeholder: the default html input placeholder.
* autofocus: when set to true, the cursor is focused on the input. By default
`false`
* initialSearch: initial search value. Can be taken from the url (a parameter).
or can be static, for example, if the field is configured but hidden. By default
empty
* startSearchOn: is the minimum number of characters to start searching. Results
will never be shown if the input has less than this value. By default, 0.
* clearSearch: to show a clear search button to reset your search. By default
`true`
* withContainer: to wrap the search input with a div container. 
This is mandatory if you want a “clearSearch” button. By default `true`
* classNames:
    * container: refers to the parent div that contains the widget.
    * input: refers to the html input.
    clearSearch_ 
* template:
    * clearSearch: Template for the clear search layer (check [template](#templates) chapter)

Here you have a live example about a simple input field.

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre v-pre="" data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
        startSearchOn: 3,
        clearSearch: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 3
    }),
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html" style="height: 423px;"></iframe>
    </div>
</div>


## SortBy

The sort by widget allows to order the result set as you like. This widget uses
indexed_metadata fields, so make sure that you have indexed properly these
fields if you need to sort by them.

```javascript
const sortByWidget = ui.widgets.sortBy({
    target: !string,
    options: [
        {name: !string, value: !string},
        {name: !string, value: !string},
        // ...
    ],
    classNames: {
        container: ?string,
        select: ?string
    }
});
```

Parameters:

* target: is the dom selector, it can be an ID, or a class.
* options: is the list of options in a selector. The name refers to the html
text shown, and value is the field and the order of the option, being the used
format: `field:order`. Fields should avoid `indexed_metadata` prefix, and order
can have both `asc` and `desc` values. You can sort as well by score (`score`)
or by distance (`distance`). Both don't need order, just these values as field.
* classNames:
    * container: refers to the parent div class that contains the widget.
    * select: refers to the select input.

> The first defined option will be the default used option. Make sure that you
> choose properly the order.

> If a distance sort-by value is defined and there's no coordinate in the whole
> UI configuration, this sorting value will be unset and will not appear.

Here you have a live example about

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre v-pre="" data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.sortBy({
        target: '#sortby',
        options: [
            { name: 'Score', value: 'score' },
            { name: 'Best rated first', value: 'rating:desc' },
            { name: 'Worst rated first', value: 'rating:asc' },
            { name: 'Newer first', value: 'year:asc' },
            { name: 'Older first', value: 'year:desc' },
        ],
    })
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?with-sortby=1&with-rating=1&num-results=4" style="height: 614px;"></iframe>
    </div>
</div>

## Multiple Filter

You can build multiple filters in your search engine. Think of a filter a simple
list of options, being these options checkable/uncheckable, and containing the
number of options each.

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: !string,
    filterName: !string,
    filterField: !string,
    aggregationField: ?string[filterField],
    applicationType: ?integer[8],
    fetchLimit: ?integer[5],      
    viewLimit: ?integer[fetchLimit], // if default, show more won't be visible
    sortBy: ?string['_count:desc'],
    ranges: ?string{},
    labels: ?string{},
    classNames: {
        container: ?string,
        top: ?string,
        itemsList: ?string,
        item: ?string,
        active: ?string,
        showMoreContainer: ?string
    },
    template: {
        top: ?string,
        item: ?string[defaultItemTemplate],
        showMore: ?string['+ Show more'],
        showLess: ?string['- Show less']
    },
    formatData: ?function(itemData),
    activeFirst: ?boolean
})
``` 

Parameters:

* target: is the dom selector, it can be an ID, or a class.
* filterName: this will be the unique filter identifier inside this ApisearchUI
instance.
* filterField: this will be the field name of the filter when was indexed to 
Apisearch as indexed_metadata.
* aggregationField: this will be the aggregation field name when was indexed to 
Apisearch as indexed_metadata. By default, filterField value will be used.
* applicationType: the type of filter.
    * 4: Results are the intersection of selected options. A simple `AND` among
    all selections
    * 5: Same than 4, but respecting tree hierarchy. If you filter by an element
    with field `level` 1, only aggregation values with `level` 2 will be shown.
    * 8: All filtered values are cumulative. A simple `OR` among all selections.
* fetchLimit: is the limit of items to be fetched on the server.
* viewLimit: Once filter options are rendered, if this value is smaller than 
fetchLimit, only a defined number of options will be shown, exposing a
`show More` button at the end of the list.
* sortBy: refers to the order/sort of the filter items. By default, option with
more results will be first.
* ranges: If defined, you will aggregate by defined ranges, each one having to
follow range notation (`from..to`). Empty from means minus infinite. Empty to
means infinite. The values of the object will be the labels per each range. See
example.
* labels: Specific label per each option. This is optional and only will be 
used defined ones (can be partial). See example.
* classNames:
    * container: refers to the parent div class that contains the widget.
    * top: class name of the container that holds the title of the filter.
    * itemsList: class name of the filter items list.
    * item: class name of the filter item link.
    * active: class name of the selected item link.
    * showMoreContainer: class of the “show more” button container.
* template:
    * top: template string for the title of the filter list.
    * item: template string for the filter item link. If any template is passed, Apisearch UI have a default one. This template will have the following values available:
        * {{n}}: number of aggregations.
        * {{isActive}}: if filter is active.
        * {{values}}: the information of the filter: {{values.id}} and {{values.name}}.
    * showMore: template string for the “show more” button.
    * showLess: template string for the “show less” button.
* formatData: is a callable function that receives all the resulted data related
to the multiple filter widget:
    * n: number of aggregations
    * isActive: if filter is active
    * values: the information of the filter. This is useful to transform some information received before being passed to the template.
* activeFirst: If true, all active filter values will be placed at the beginning
of the list. After them, non active will be placed. Otherwise, positions are
maintained. By default `true`

You can see an example of what an item template is like

```javascript
const filterItemTemplate = `
    <input 
        type="checkbox" 
        id="filter_{{values.id}}"
        {{#isActive}}checked="checked"{{/isActive}}
    >
    <label 
        class="item-name"
        for="filter_{{values.id}}"
    >
        {{{values.name}}}
    </label>
    <span class="aggregations">{{n}}</span>
`;
```

You can see as well how is a range filter like

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: '#my-div',
    filterName: 'price',
    filterField: 'price,
    ranges: {
        '0..10': 'Less than 10 euros',
        '10..20': 'From 10 to 20 euros',
        '20..': 'More than 20 euros',
    },
});
```

You can see as well how is a filter with labels like. As a premise, indexed
categories are named as internal codes. Could be as well translations, for
example

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: '#my-div',
    filterName: 'category',
    filterField: 'category,
    ranges: {
        'cat-1': 'Shirts',
        'cat-2': 'Shoes',
        'cat-3': 'Hats',
    },
});
```

Here you have a live example about how to create some filters. In that case, we
have created a small year filter, defining some ranges (only available when you
work with numbers or dates).

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.multipleFilter({
        target: '#filter',
        filterName: 'year',
        filterField: 'year',
        activeFirst: false,
        ranges: {
            '..1970': 'Until seventies',
            '1970..2000': 'From 1970 to 2000',
            '2000..': 'This millennium'
        }
    })
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?with-filter=1&with-rating=1&num-results=4&first-query=1" style="height: 614px;"></iframe>
    </div>
</div>

## Checkbox filter

Simple boolean filter. Can be checked or unchecked.

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: !string,
    filterName: !string,
    filterField: !string,
    label: ?string,
});
``` 

Properties:

* target: is the dom selector, it can be an ID, or a class
* filterName: this will be the unique filter identifier inside this ApisearchUI
instance
* filterField: this will be the field name of the filter when was indexed to 
Apisearch as indexed_metadata
* Label: filter label. What true value means. By default, `1`

## Range filter

Add range filters for numeric fields, like prices or years. By default, this
widget will expose two numeric input fields, buf you can use your own libraries
for managing these values with some range libraries, like JQuery UI.

> You can change these fields values by using javascript 
> `setAttribute('value', 123)` method, and never changing directly the value.

```javascript
const rangeFilter = ui.widgets.rangeFilter({
    target: !string,
    filterName: !string,
    filterField: !string,
    minValue: ?string[0],
    maxValue: ?string[1000],
    from: {
        class: ?string,
        attributes: ?string[],
        initialValue: ?string[minValue]
    },
    to: {
        class: ?string,
        attributes: ?string[],
        initialValue: ?string[minValue]
    },
});
```

Parameters

* target: is the dom selector, it can be an ID, or a class.
* filterName: this will be the unique filter identifier inside this ApisearchUI
instance.
* filterField: this will be the field name of the filter when was indexed to 
Apisearch as indexed_metadata.
* minValue: Minimum value for the range. By default, 0
* maxValue: Maximum value for the range. By default, 1000
* from:
    * class: Class added to numeric input representing the from value
    * attributes: Object containing key:values for input attributes
    * initialValue: Initial value for the field. By default, minValue is used
* to:
    * class: Class added to numeric input representing the to value
    * attributes: Object containing key:values for input attributes
    * initialValue: Initial value for the field. By default, maxValue is used
    
In this example, we use jQuery UI range library for adding a year range.

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.rangeFilter({
        target: '#range',
        filterName: 'year',
        filterField: 'year',
        fromValue: 1900,
        toValue: 2020
    })
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?with-range=1&with-rating=1&num-results=4&first-query=1" style="height: 535px;"></iframe>
    </div>
</div>

## Clear filter

Clear filters button as soon as there some active items.

```javascript
const clearFilters = ui.widgets.clearFilters({
    target: !string,
    classNames: {
        container: ?string
    },
    template: {
        container: ?string['Clear filters']
    }
});
```

Parameters:

* target: is the dom selector, it can be an ID, or a class
* classNames:
    * container: refers to the parent div class that contains the widget.
* template:
    * container: template string for the container
    
Here you have a small snippet showing you how to use clear filter button (make
sure you filter by something before it appears)

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.multipleFilter({
        target: '#filter',
        filterName: 'year',
        filterField: 'year',
        activeFirst: false,
        ranges: {
            '..1970': 'Until seventies',
            '1970..2000': 'From 1970 to 2000',
            '2000..': 'This millennium'
        }
    }),
    ui.widgets.clearFilters({
        target: '#clear-filters',
        classNames: {
            container: 'button is-danger is-light'
        }
    }),
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?with-filter=1&with-clear-filters=1&num-results=4&first-query=1" style="height: 614px;"></iframe>
    </div>
</div>

## Pagination

This widget allows to navigate through the results with a pagination links.

```javascript
const resultInformationWidget = ui.widgets.pagination({
    target: !string,
    padding: ?integer[3],
    goFirstLast: ?bool[false],
    classNames: {
        container: ?string,
        item: ?string,
        active: ?string['active'],
        disabled: ?string['disabled'],
        next: ?string,
        first: ?string,
        previous: ?string,
        last: ?string
    },
    template: {
        item: ?string['{{page}}'],
        next: ?string['Next >'],
        previous: ?string['< Prev'],
        first: ?string['<< First'],
        last: ?string['Last >>']
    }
});
```

Properties

* target: is the dom selector, it can be an ID, or a class.
* padding: is the number of page links that will appear on each side of the 
current page. For example, if padding is set to 2, and current page is [5], the 
result will be: [<] 3 4 [5] 6 7 [>]
* classNames:
    * container: refers to the parent div class that contains the widget.
    * item: class name of the page item.
    * active: class name of the current page.
    * disabled: class name of the disabled buttons. when current page is the 
    first page, the first and previous buttons will have this class.
    * next: class name of the next page button.
    * first: class name of the first page button.
    * previous: class name of the previous page button.
    * last: class name of the last page button.
* template:
    * item: template string of the page item. This property will have the page 
    number available using the mustache notation {{page}}.
    * next: template string of the next page button.
    * first: template string of the first page button.
    * previous: template string of the previous page button.
    * last: template string of the last page button.

In this example you can see a simple pagination widget.

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.pagination({
        target: '#pagination',
        goFirstLast: true,
        padding: 1,
    }),
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?num-results=4&with-pagination=1&with-rating=1&first-query=1" style="height: 550px;"></iframe>
    </div>
</div>

## Information

The result information widget allows you to provide to a user some extra
information about the search. Currently, only can show the number of hits of the
current search, and the total number of items.

```javascript
const resultInformationWidget = ui.widgets.information({
    target: !string,
    classNames: {
        container: ?string
    },
    template: {
        container: !string['Found {{total_hits}} of {{total_items}} items'],
    },
    formatData: ?function(resultInformationData)
});
```

Parameters:

* target: is the dom selector, it can be an ID, or a class.
* classNames:
    * container: refers to the parent div class that contains the widget.
* template:
    * container: is the template string of the result information. The variables
    `{{total_hits}}` and `{{total_items}}` can be used on the template.
* formatData: is a callable function that receives the resulted data related to
the information widget: total_hits and total_items. Is useful to transform some
information received before being passed to the template.

In this example, we have a simple information widget on top of the results
widget.

<div class="columns is-desktop">
    <div class="column is-two-thirds-fullhd is-half-desktop">
        <pre data-lang="javascript">
        <code lang="javascript">ui.addWidgets(
    ui.widgets.searchInput({
        target: '#input',
        placeholder: 'Type to search...',
        autofocus: true,
    }),
    ui.widgets.result({
        target: '#results',
        itemsPerPage: 4
    }),
    ui.widgets.information({
        target: '#information',
    }),
);</code></pre>
    </div>
    <div class="column is-one-third-fullhd is-half-desktop is-desktop">
        <iframe scrolling="no" loading="lazy" src="/_iframe/search-input.html?num-results=4&with-information=1&with-rating=1&first-query=1" style="height: 550px;"></iframe>
    </div>
</div>