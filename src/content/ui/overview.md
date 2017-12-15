---
page: 1
title: Installation
description: This is the installation
category: UI
template: one-column-with-toc.mustache
source: ui/overview.md
languages: 
  - js
tags:
  - apisearch-tools
  - apisearch ui
  - search components
---

# Overview

ApisearchUI library is set of tools to build a custom search experience for your 
website, e-commerce, docs site, or any other web application you can imagine.
It provides a list of common widgets like a search box, a result list, filters, 
sorting dropdown, pagination, and many more explained below.

All your data must be previously indexed using the Apisearch tools. For more 
information say hi to: hello@puntmig.com


## Install

### npm & yarn
```shell
npm install apisearch-ui --save
# or
yarn add apisearch-ui
```

### html tag \<script\>
You can either download the library and use a relative path to 
your assets folder, or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui/dist/apisearch-ui.min.js"></script>
``````

## Usage
This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
// Create instance
const ui = apisearchUI({
    appId: 'music',
    apiKey: '1cc7a3e0-bda5-11e7-abc4-cec278b6b50a'
});

// Append widgets
ui.addWidgets(
    ui.widgets.simpleSearch({
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

All widgets are passed using `.addWidget(widget)` method,
or using `.addWidgets(...widgets)` to add widgets in a bulk mode,
like in the example below.

Once your setup is done, you just call the `.init()` method to 
start all the magic!

> Check out this for more examples: 
> [apisearch-ui/examples](https://github.com/puntmig/javascript-search-ui/tree/master/examples)!


## Initialization

Before configuring your widgets, first you need to create
a new instance of `apisearchUI`. This will be the core
of your UI search engines are `appId` and `apiKey`, the `options`
parameters are totally optional.

This is the anatomy of the ApisearchUI configuration:

```javascript
const ui = apisearchUI({
    appId: !string,
    apiKey: !string,
    options: {
        endpoint: ?string,
        apiVersion: ?string,
        timeout: ?int[10000],
        inMemoryCache: ?bool[true],
    }
});
```

Once your instance and widgets are defined, don't
forget to initialize it!

```javascript
ui.init();
```