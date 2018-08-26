---
page: 1
icon: angle-right
title: Search UI
description: ApisearchUI documentation page.
category: UI
template: one-column-with-toc.mustache
source: ui/search-ui.md
languages: 
  - javascript
tags:
  - search ui installation
  - quick usage
  - user interface configuration
  - search widgets
  - ui examples
---

# Search UI

This library is a set of tools to build a custom search experience for your 
website, e-commerce, docs site, or any other web application you can imagine.
It provides a list of common widgets like a search box, a result list, filters, 
sorting dropdown, pagination, and many more explained below.


## Installation

**npm & yarn**

```shell
npm install apisearch-ui --save
// or
yarn add apisearch-ui
```

**html tag \<script\>**

You can either download the library and use a relative path to 
your assets folder, or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui/dist/apisearch-ui.min.js"></script>
```


## Quick start

This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
// Create instance
const ui = apisearchUI.create({
    app_id: 'your_app_id',
    index_id: 'your_index_id',
    token: 'your_app_QUERY_token'
});

// Append widgets
ui.addWidgets(
    ui.widgets.searchInput({
        target: '.search-container',
    }),
    ui.widgets.result({
        target: '.result-container',
        template: {
            itemsList: '<ul>{{#items}} <li>{{metadata.name}}</li> {{/items}}</ul>',
        }
    })
);

// Initialize it
ui.init();
```

Before configuring your widgets, first you need to create
a new instance of `apisearchUI`, passing an `app_id`,
an `index_id` and an **Query** accessible `token`.

All widgets are passed using `.addWidget(widget)` method,
or using `.addWidgets(...widgets)` to add widgets in a bulk mode,
like in the example below.

Once your setup is done, you just call the `.init()` method to 
start all the magic!

> **Note:** If you don't want the UI to query data automatically 
> when `.init()` the instance, just add `.init({firstQuery: false})`
> and no data will be fetched.

Check out this for more examples: 
[apisearch-ui/examples](https://github.com/apisearch-io/search-ui/tree/master/examples)!


## Anatomy
This is the anatomy of the ApisearchUI configuration:

```javascript
const ui = apisearchUI.create({
    app_id: string,
    index_id: string,
    token: string,
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

## Widgets

Widgets are nothing but a small pieces of html connected between them that let
you build a fully customized search experience. They can be used as a search input,
a result set, a pagination component, different kind of filters, and many more.


### Search Input

The search input widget is to perform text based 
searches.

This widget points to `searchable_metadata` and 
`exact_matching_metadata` field of the indexed items.

```javascript
const searchInputWidget = ui.widgets.searchInput({ 
  target: !string,
  placeholder: ?string,
  autofocus: ?bool[false],
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

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `placeholder`: the default html input placeholder.
 - `autofocus`: when set to `true`, the cursor is focused on the input.
 - `startSearchOn`: is the minimum number of characters to start searching.
 - `clearSearch`: to show a clear search button to reset your search.
 - `withContainer`: to wrap the search input with a div container. 
 This is mandatory if you want a "clearSearch" button.
 - `classNames`:
    - `container`: refers to the parent `div` that contains the widget.
    - `input`: refers to the html input.


### Sort By

The sort by widget allows to order the result set as you like.

This widget points to `indexed_metadata` field.

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

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `options`: is the list of options in a selector. The `name` refers
 to the html text shown, and `value` is the value of the option itself.
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
    - `select`: refers to the select input.
    
    
### Multiple Filter

The filter widget allows you to refine your search.

```javascript
const multipleFilterWidget = ui.widgets.multipleFilter({
    target: !string,
    name: !string,
    filterField: !string,
    aggregationField: ?string[filterField],
    applicationType: ?integer[8],
    fetchLimit: ?integer[5],      
    viewLimit: ?integer[fetchLimit], // if default, show more won't be visible
    sortBy: ?string['_count:desc'],
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
    formatData: ?function(itemData)
})
```

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `name`: this will be the unique filter identifier inside 
 this ApisearchUI instance.
 - `filterField`: this will be the field name of the filter
 when was indexed to Apisearch as `indexed_metadata`. 
 - `aggregationField`: this will be the aggregation field name
 when was indexed to Apisearch as `indexed_metadata`.
 - `applicationType`: the type of filter. Check out the
 [javascript client](https://github.com/apisearch-io/javascript-client#filters) 
 docs for more information.
 - `fetchLimit`: is the limit of items to be fetched on the server.
 - `viewLimit`: If there are 10 fetched items, and viewLimit is 5. Only
  the 5 first numbers will be visible and a "show more" / "show less" 
  button will appear.
 - `sortBy`: refers to the order/sort of the filter items.
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
    - `top`: class name of the container that holds the title of the filter.
    - `itemsList`: class name of the filter items list.
    - `item`: class name of the filter item link.
    - `active`: class name of the selected item link.
    - `showMoreContainer`: class of the "show more" button container.
 - `template`:
    - `top`: template string for the title of the filter list.
    - `item`: template string for the filter item link. If any template is passed, 
    Apisearch UI have a default one. This template will have the following 
    values available:
        - `{{n}}`: number of aggregations. 
        - `{{isActive}}`: if filter is active.
        - `{{values}}`: the information of the filter: `{{values.id}}` and 
        `{{values.name}}`.
    - `showMore`: template string for the "show more" button.
    - `showLess`: template string for the "show less" button. 
 - `formatData`: is a callable function that receives all the resulted
 data related to the multiple filter widget: 
    - `n`: number of aggregations. 
    - `isActive`: if filter is active.
    - `values`: the information of the filter. 
 This is useful to transform some information received before being 
 passed to the template. 
 
 As a example of an item template, you can check this:
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


### Clear filters button

Clear filters widget gives us a button to remove all active
filters.
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

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
 - `template`:
    - `container`: is the template string for the element.
 
 
### Search result

The result widget allows you to print a set of results
based on the search.

```javascript
const resultWidget = ui.widgets.result({
    target: !string,
    itemsPerPage: ?integer[10],
    highlightsEnabled: ?bool[false],
    promote: [
        {id: !string, type: !string},
        {id: !string, type: !string},
        //...   
    ],
    exclude: [
        {id: !string, type: !string},
        {id: !string, type: !string},
        //...   
    ],
    classNames: {
        container: ?string
    },
    template: {
        itemsList: !string,
        placeholder: ?string
    },
    formatData: ?function(resultData)
});
```

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `highlightsEnabled`: when `true`, the text of the item indexed as
 a highlighted, will be accessible from the `highlights` attribute on
 each resulted element.
 - `exclude`: an array of items to be promoted on the result set.
 - `promote`: an array of items to be excluded from the result set.
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
 - `template`:
    - `itemsList`: is the template string of the iterable set of results.
    - `placeholder`: this template will be placed on initial widget render.
    Once a search is performed, this placeholder will disappear.
 - `formatData`: is a callable function that receives all the resulted
 data, is useful to transform some information received before being passed 
 to the template.


On the `itemsList` template you have access to this two variables:
 * `items`: an array of resulted items.
 * `query`: the query text made for the search.
The variable `items` will be accessible on the body attribute using
the `{{#items}}{{/items}}` iterable. For example, given this array 
of results:

```javascript
{
    items: [
        {
            uuid: { source: 'Ba7XMhGh6yy', type: 'marvel' },
            metadata: {
                name: 'Tony Stark',
                img: 'https://api.marvel.com/v2/characters/tony-stark'
            }
        },
        {
            uuid: { source: 'Ba6mSyvhAJt', type: 'marvel' },
            metadata: {
                name: 'Peter Parker',
                img: 'https://api.marvel.com/v2/characters/peter-parker'
            }
        },
        //...
    ]
}
```

You will be able to build your results like this, and
passing the string to the `body` template attribute:

```javascript
const resultsTemplate = `
    <ul>
    {{#items}}
        <li>
            <img src="{{metadata.img}}" />
            <h1>{{metadata.name}}</h1>
        </li>
    {{/items}}
    </ul>
    {{^items}}
        No results found for this search: <b>{{query}}</b> :(
    {{/items}}
`;
```

For more information about how this templating system works,
refer to the [twitter's hogan.js documentation](http://twitter.github.io/hogan.js/). 
Or check the library examples.


### Pagination

This widget allows to navigate through the results
with a pagination links.

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

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `padding`: is the number of page links that will appear on each side
 of the current page. For example, if padding is set to 2, and current 
 page is `[5]`, the result will be: `[<] 3 4 [5] 6 7 [>]`
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
    - `item`: class name of the page item.
    - `active`: class name of the current page.
    - `disabled`: class name of the disabled buttons. when current 
    page is the first page, the `first` and `previous` buttons will have
    this class. 
    - `next`: class name of the next page button.
    - `first`: class name of the first page button.
    - `previous`: class name of the previous page button. 
    - `last`: class name of the last page button.
 - `template`:
    - `item`: template string of the page item. This property will
    have the page number available using the mustache notation `{{page}}`.
    - `next`: template string of the next page button.
    - `first`: template string of the first page button.
    - `previous`: template string of the previous page button. 
    - `last`: template string of the last page button. 

### Information (Result info)

The result information widget allows you to provide
to a user some extra information about the search.
Currently only can show the **number of hits** of 
the current search and the total **number of items**.

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

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `classNames`:
    - `container`: refers to the parent `div` class that 
    contains the widget.
 - `template`:
    - `container`: is the template string of the result information.
    The variables `{{total_hits}}` and `{{total_items}}` can be used
    on the template.
 - `formatData`: is a callable function that receives the resulted
 data related to the information widget: `total_hits` and `total_items`.
 Is useful to transform some information received before being passed 
 to the template.


## Multiple instances

When working with ApisearchUI you have to keep in mind that you 
can work with multiple ApisearchUI instances at once. 

This instances need a client to request all the data from the Apisearch 
servers. The thing is, you can work with only one client if all your 
ApisearchUI instances consume the same data store (index). Or with 
many clients if you want all your ApisearchUI instances to consume from
many different indices.

## Examples

There are infinite possibilities where Apisearch can be used, even the search
input of this documentation is built on top of Apisearch. Here we'll show some 
use cases.

### API Music

This is a simple aggregator of music albums built entirely with Apisearch to index
and query the data, and ApisearchUI to build the super fast experience. 
> You can play with it on [apisearch.io](http://apisearch.io/product.html)! :)

![](/assets/media/apisearch-music.gif)
