---
title: Search API
description: Api Reference - Search
icon: angle-right
page: 3
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/search.md
languages: 
  - php
  - javascript
  - json
tags:
  - apisearch reference
  - http
  - json
---

### Index Items

By using this endpoint you will be able to add some items in your index. Before
going deeper, remember how you can use and manage Items in Apisearch

- [Api Reference - Item](http://docs.apisearch.io/api-reference/model.html#item)
- [Api Reference - ItemUUID](http://docs.apisearch.io/api-reference/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1-items-index
- Path - /v1/items
- Verb - POST
- Query Parameters
    - app_id, *required*
    - index, *required*
    - token, *required*
- Body
    - [Item](http://docs.apisearch.io/api-reference/model.html#item)[]

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

### Update Items
### Query

Makes a simple query and return a result.

```yml
Path - /v1
Verb - GET
Query_Parameters:
    app_id: string
    index: string
    token: string
    query: Query
```

This endpoint will return a [Result](#result) object.