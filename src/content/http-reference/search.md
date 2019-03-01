---
title: Search
description: HTTP Reference - Search
icon: angle-right
page: 3
category: HTTP Reference
template: one-column-with-toc.mustache
source: http-reference/search.md
tags:
  - http
  - reference
  - search
---

# Search API

Search your items by using these endpoints.

## Query

By using this endpoint you will make a simple query to one or several indices in
an existing app. Here some related model objects you may know.

- [Model - Query](/model.html#query)
- [Client Reference - Query creation](/client-reference/query-creation.html)

This is the endpoint reference

- Endpoint name - v1-query
- Path - **/v1**
- Verb - **GET**
- Query Parameters
    - app_id, **required** 
    - index, *not required, can be multiple separated by comma*
    - token, **required with permissions** 
    
The body of the endpoint should be an array with one optional position with 
key `query` and a [Query](/model.html#query) 
object as value.

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XGET -H "Content-Type: application/json" "http://localhost:8100/v1?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "query": {
        "q": "house"
    }
}
'
```

By doing an empty query, you would receive the first items of the index. In this
case, and because you don't really to pass the query at all, you can omit the
Content-Type header.

```bash
curl -XGET -H "Content-Type: application/json" "http://localhost:8100/v1?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"
```

This endpoint will return a [Result](/model.html#result) object.