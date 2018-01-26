---
page: 1
icon: angle-right
title: Installation
description: ApisearchUI installation.
category: UI
template: one-column-with-toc.mustache
source: ui/installation.md
languages: 
  - javascript
tags:
  - installation
  - quick usage
  - user interface configuration
---

# Installation

**npm & yarn**

```shell
npm install apisearch-ui --save
# or
yarn add apisearch-ui
```

**html tag \<script\>**

You can either download the library and use a relative path to 
your assets folder, or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui/dist/apisearch-ui.min.js"></script>
``````


## Quick start

This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
// Create instance
const ui = apisearchUI({
    appId: '241ly34R',
    indexId: 'yT656u37',
    token: '1cc7a3e0-bda5-11e7-abc4-cec278b6b50a'
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

Before configuring your widgets, first you need to create
a new instance of `apisearchUI`. This will be the core
of your UI search engines are `appId` and `apiKey`, the `options`
parameters are totally optional.

All widgets are passed using `.addWidget(widget)` method,
or using `.addWidgets(...widgets)` to add widgets in a bulk mode,
like in the example below.

Once your setup is done, you just call the `.init()` method to 
start all the magic!

> Check out this for more examples: 
> [apisearch-ui/examples](https://github.com/puntmig/javascript-search-ui/tree/master/examples)!


## Anatomy
This is the anatomy of the ApisearchUI configuration:

```javascript
const ui = apisearchUI({
    appId: !string,
    indexId: !string,
    token: !string,
    options: {
        endpoint: ?string,
        apiVersion: ?string,
        timeout: ?int[10000],
        inMemoryCache: ?bool[true]
    }
});
```