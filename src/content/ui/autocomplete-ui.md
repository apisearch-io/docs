---
page: 2
icon: angle-right
title: Autocomplete UI
description: Apisearch Autocomplete documentation page.
category: UI
template: one-column-with-toc.mustache
source: ui/autocomplete-ui.md
languages: 
  - javascript
tags:
  - autocomplete search ui installation
  - quick usage
  - user interface configuration
  - search widgets
  - ui examples
---


# Autocomplete UI

This library is a tool to build a custom search experience for your 
website, e-commerce, docs site, or any other web application you can imagine.
It attaches a customized autocomplete search to your current search bar
directly connected to Apisearch.


## Installation

**npm & yarn**

```shell
npm install apisearch-autocomplete --save
// or
yarn add apisearch-autocomplete
```

**html tag \<script\>**

You can either download the library and use a relative path to 
your assets folder, or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-autocomplete/dist/apisearch-autocomplete.min.js"></script>
``````

## Quick start

This simple setup allows you to build a full text search
input with a result container using a custom template 
engine.

```javascript
// Create instance
const autocomplete = apisearchAutocomplete({
    appId: 'your_app_id',
    indexId: 'your_index_id',
    token: 'your_app_QUERY_token'
});

// Configure it!
autocomplete({
    inputTarget: '.apisearch-autocomplete',
    datasets: [{
        type: 'post',
        template: {
            header: '<h3>Posts</h3>',
            item: '<a href="{{metadata.url}}">{{metadata.title}}</a>'
        }
    }]
});
```

Before calling the autocomplete function, first you need to create
a new instance of `apisearchAutocomplete`, passing an `appId`,
an `indexId` and an **events** `token`.

Then you are ready to configure your search.

> Check out this for more examples: 
> [apisearch-autocomplete/examples](https://github.com/apisearch-io/autocomplete-ui/tree/master/examples)!


## Anatomy

This is the anatomy of the ApisearchAutocomplete configuration:

```javascript
const ui = apisearchAutocomplete({
    appId: !string,
    indexId: !string,
    token: !string,
    options: {
        endpoint: ?string,
        apiVersion: ?string,
        timeout: ?int[10000]
    }
});
```

## Autocomplete function

Once the `ApisearchAutocomplete` instance is created,
we can convert any input of our site into an autocomplete
search input.

```javascript
autocomplete({
    inputTarget: '.apisearch-autocomplete',
    datasets: [{
        type: !string,
        template: {
            header: ?string[null],
            item: !string
        }
    }]
});
```

**Parameters:**
 - `inputTarget`: is the dom selector, it can be an id or a class.
 - `datasets`: is an array of every dataset.
   - `type`: is the `uuid.type` of your item. So your results will be categorized 
   by its own data type.
   - `template`:
     - `header`: is optional, but it refers to the title header of the dataset.
     If your dataset items are type of "blog_post", your header can be "Blog posts".
     - `item`: is the template of the resulted item.
     
     
## Examples
This is a simple example of an autocomplete search made with the 
Apisearch engine and Apisearch Autocomplete.

![](/assets/media/autocomplete-example.gif#inline)
