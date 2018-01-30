---
page: 3
icon: angle-right
title: Events UI
description: Apisearch Event charts documentation page.
category: UI
template: one-column-with-toc.mustache
source: ui/events-ui.md
languages: 
  - javascript
tags:
  - event charts installation
  - quick usage
  - user interface configuration
  - chart widgets
  - ui charts
---

# Events UI

## Installation

**npm & yarn**

```shell
npm install apisearch-events-ui --save
// or
yarn add apisearch-events-ui
```

**html tag \<script\>**

You can either download the library and use a relative path to 
your assets folder, or use a CDN like jsDelivr. 
```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-events-ui/dist/apisearch-events-ui.min.js"></script>
```

## Quick start

This simple setup allows you to build a chart that will show
all queries made in the last 30 days.

```javascript
// Create instance
const eventsUI = apisearchEventsUI({
    appId: 'your_app_id',
    indexId: 'your_index_id',
    token: 'your_app_EVENTS_token'
});

// Append widgets
eventsUI.addWidgets(
    eventsUI.widgets.lastQueries({
        target: '.last-queries-container'
    })
);

// Initialize it
eventsUI.init();
```

Before customizing your widgets, first you need to create
a new instance of `apisearchEventsUI`, passing an `appId`,
an `indexId` and an **events** `token`.

All widgets are passed using `.addWidget(widget)` method,
or using `.addWidgets(...widgets)` to add widgets in a bulk mode,
like in the example below.

Once your setup is done, you just call the `.init()` method to 
start all the magic!

> Check out this for more examples: 
> [apisearch-events-ui/examples](https://github.com/apisearch-io/events-ui/tree/master/examples)!


## Anatomy

This is the anatomy of the ApisearchEventsUI configuration:

```javascript
const ui = apisearchEventsUI({
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


## Widgets

Event Widgets are different charts and representations of every event occurred
on your applications. You can either create your own charts using our Javascript client
or use this library with predefined charts. 

All charts of this library are built using [Chart.js](http://www.chartjs.org/).


### Raw Events

This widget gives you a table list of the last events made on your system.
There can be three types of events "Query", "Index", "Delete". 

For more information about the events read [Api-client/Event](http://docs.apisearch.io/api-client/event.html).

```javascript
const rawEventsWidget = eventsUI.widgets.rawEvents({
    target: !string,
    itemsPerPage: ?integer[10],
    classNames: {
        container: ?string,
        eventsList: ?string
    },
    template: {
        eventsList: ?string[defaultItemsListTemplate]
    },
    formatData: ?function(event)
})
```

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `itemsPerPage`: the number of event items on page.
 - `classNames`: 
     - `container`: refers to the parent `div` that contains the whole widget.
     - `eventsList`: refers to the `div` that contains the `eventsList` template.
 - `template`: 
     - `eventsList`: is the template of the events list, there is a template by default.
     The template system uses Hogan.js, a mustache-like syntax.
 - `formatData`: is a callable function that receives every event item from the 
 response. Is useful to transform some information received before being passed 
 to the `eventsList` template.
 

### Last Queries
Last Queries widget gives you a line chart with all queries during the last month.

```javascript
const lastQueriesWidget = eventsUI.widgets.lastQueries({
    target: !string,
    boxWidth: ?integer[200],
    boxHeight: ?integer[300],
    chartOptions: ?ChartJSLineChartOptions[lineChartDefaultOptions]
})
```

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `boxWidth`: chart container width.
 - `boxHeight`: chart container height. 
 - `chartOptions`: This is the chart configuration and expects a `Chart.js`
 object configuration. You can check more how a chart is configured
 in [chart.js docs](http://www.chartjs.org/docs/latest/) 


### Search Effectiveness 
Also known as **Queries with results v.s. Queries without results**.

Search effectiveness gives you a line chart with two datasets,
the first one with the queries made in the last month that returned at least one result,
the second dataset gives you the number of queries that returned 0 results.
This is useful to compare the effectiveness of your user searches.

```javascript
const searchEfivenessWidget = eventsUI.widgets.searchEffectiveness({
    target: !string,
    boxWidth: ?integer[200],
    boxHeight: ?integer[300],
    chartOptions: ?ChartJSOptions[lineChartDefaultOptions]
})
```

**Parameters:**
 - `target`: is the dom selector, it can be an id or a class.
 - `boxWidth`: chart container width.
 - `boxHeight`: chart container height. 
 - `chartOptions`: This is the chart configuration and expects a `Chart.js`
 object configuration. You can check more how a chart is configured
 in [chart.js docs](http://www.chartjs.org/docs/latest/) 


## Examples
This is a simple dashboard example made with this library. The left side charts are
made using the **LastQueries** and **SearchEffectiveness** widgets. On the right side
the **RawEvents** widget.
 
![](/assets/media/events-dashboard.png)