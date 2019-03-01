---
page: 1
icon: angle-right
title: Callback Plugin
description: Apisearch plugins - Callbacks
category: Plugins
template: one-column-with-toc.mustache
source: plugins/callbacks.md
languages: ~
tags:
  - plugin
  - callbacks
---

# Callback Plugin

With this plugin you will be able to add some callbacks to external services
during the execution of all Apisearch processes.

Let's see an example.

```yaml
apisearch_plugin_callbacks:
    endpoints:
        on_query:
            command: Query
            endpoint: http://myserver.org/endpoint/change-query
            method: GET
            moment: before
        on_query_result:
            command: Query
            endpoint: http://myserver.org/endpoint/change-result
            method: GET
            moment: after
        on_items_items:
            command: IndexItems
            endpoint: http://myserver.org/endpoint/index-items
            method: POST
            moment: before
        
```

As you can see, you can define your callback before the main command handler is
executed, so in this case you will only have access to the command itself, or
after the command handler has created the result, where you'll be able to modify
the result itself.

> You will notice that some of the Commands only will work by defining the
> callback as `before`. This is because Commands never return result, so has no
> sense to define callbacks after the handler

## Query - before handler

When a Query is created, you can modify this query by adding some extra logic,
for example, with an integration of a machine learning engine.

```yaml
apisearch_plugin_callbacks:
    endpoints:
        on_query:
            command: Query
            endpoint: http://myserver.org/endpoint/change-query
            method: GET
            moment: before
        
```

Your endpoint will receive exactly the same query that the system has received.
You can check this format in the
[Query HTTP Reference](/http-reference/search.html#query).
Your endpoint should return exactly the same body than has received.

## Query - after handler

After the query has been executed, and when we have created a new Result
instance, we can add some callbacks in order to manipulate, filter and enrich
your data.

```yaml
apisearch_plugin_callbacks:
    endpoints:
        on_query_result:
            command: Query
            endpoint: http://myserver.org/endpoint/change-result
            method: GET
            moment: after
        
```

Your endpoint will receive a Result instance, and should return exactly the same
body structure that has received.

## IndexItems - before handler

Each time we index some items, we can call our endpoints to manipulate, filter
and enrich them before going to the search engine.

```yaml
apisearch_plugin_callbacks:
    endpoints:
        on_items_items:
            command: IndexItems
            endpoint: http://myserver.org/endpoint/index-items
            method: POST
            moment: before
        
```

Your endpoint will receive exactly the same array of items that the system has
received. You can check this format in the
[Index Items HTTP Reference](/http-reference/index.html#index-items).
Your endpoint should return exactly the same body than has received.

## AddToken - before handler

Each time we create or update a new Token, we can call our endpoints to
manipulate, filter and enrich them before going to the Token Repository.

```yaml
apisearch_plugin_callbacks:
    endpoints:
        on_add_token:
            command: AddToken
            endpoint: http://myserver.org/endpoint/add-token
            method: POST
            moment: before
        
```

Your endpoint will receive exactly the same Token that the system has received. 
You can check this format in the
[Add Token HTTP Reference](/http-reference/application.html#add-token).
Your endpoint should return exactly the same body than has received.

## More to be added