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