# UI Quickstart

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
your assets folder, or use a CDN like jsDelivr. Use `latest` version to load
the last published version.

```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui@latest/dist/apisearch-ui.min.js"></script>
```

Use an specific version, for an old one.

```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui@0.2.17/dist/apisearch-ui.min.js"></script>
```

## Create your first UI

This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
// Create factory
// Use the endpoint where your server is running.
const uiFactory = apisearchUI.factory({
    app_id: 'your_app_id',
    index_id: 'your_index_id',
    token: 'your_app_QUERY_token',
    options: {
        endpoint: 'https://localhost:8200'
    }
});

// Create a UI instance and append widgets
const ui = uiFactory.createUI();
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
an `index_id` and a **Query** accessible `token`.

All widgets are past using `.addWidget(widget)` method,
or using `.addWidgets(...widgets)` to add widgets in bulk mode,
like in the example below.

Check all the available widgets in our [UI Reference](reference.md)  
In case you want to work with different UI instances, you can check the 
[Multiple UI Instances](recipes.md#multiple-ui-instances) recipe.

Once your setup is done, you just call the `.init()` method to 
start all the magic!

> **Note:** If you don't want the UI to query data automatically 
> when `.init()` the instance, just add `.init({firstQuery: false})`
> and no data will be fetched until you start searching.

Check out this for more examples: 

- [Minimum Setup](https://apisearch-io.github.io/search-ui/examples/minimum-setup.html)
- [Filtered Search](https://apisearch-io.github.io/search-ui/examples/filtered-search.html)
- [Multiple Apisearch instances](https://apisearch-io.github.io/search-ui/examples/multiple-apisearch-instances.html)
- [Simple Search](https://apisearch-io.github.io/search-ui/examples/simple-search.html)
