---
title: Search API
description: Api Reference - Search
icon: angle-right
page: 3
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/search.md
tags:
  - apisearch reference
  - http
  - json
---

# Search API

## Index Items

By using this endpoint you will be able to add some items in your index.
Here some related model objects you may know.

- [Api Reference - Item](http://docs.apisearch.io/api-reference/model.html#item)
- [Api Reference - ItemUUID](http://docs.apisearch.io/api-reference/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1-items-index
- Path - /v1/items
- Verb - POST
- Query Parameters
    - app_id, *required*
    - index, *required*
    - token, *required with permissions*
    
The body of this endpoint is an array with one optional position with 
key `items` and an array of [Item](/api-reference/model.html#item) objects as
value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST "http://localhost:8100/v1/items?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "items": [
        {
            "uuid": {
                "id": "1",
                "type": "product"
            },
            "metadata": {
                "title": "My product"
            },
            "searchable_metadata": {
                "title": "My product"
            }
        },
        {
            "uuid": {
                "id": "2",
                "type": "product"
            },
            "metadata": {
                "title": "Another product"
            },
            "searchable_metadata": {
                "title": "Another product"
            }
        }
    ]
}
'
```

## Delete Items

By using this endpoint you will be able to delete some existing items from your
index. Here some related model objects you may know.

- [Api Reference - Item](http://docs.apisearch.io/api-reference/model.html#item)
- [Api Reference - ItemUUID](http://docs.apisearch.io/api-reference/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1-items-index
- Path - /v1/items
- Verb - DELETE
- Query Parameters
    - app_id, *required*
    - index, *required*
    - token, *required with permissions*
    
The body of this endpoint is an array with one optional position with 
key `items` and an array of [ItemUUID](/api-reference/model.html#itemuuid) 
objects as value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XDELETE "http://localhost:8100/v1/items?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "items": [
        {
            "id": "1",
            "type": "product"
        },
        {
            "id": "2",
            "type": "product"
        }
    ]
}
'
```

## Update Items
## Query

By using this endpoint you will make a simple query to one or several indices in
an existing app. Here some related model objects you may know.

- [Api Reference - Query](/api-reference/model.html#query)
- [Api Client - Building a Query](/api-client/query.html#building-a-query)

This is the endpoint reference

- Endpoint name - v1-query
- Path - /v1
- Verb - GET
- Query Parameters
    - app_id, *required*
    - index, *not required, can be multiple separated by comma*
    - token, *required with permissions*
    
The body of the endpoint should be an array with one optional position with 
key `query` and a [Query](/api-reference/model.html#query) 
object as value.

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XGET "http://localhost:8100/v1?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "query": {
        "q": "house"
    }
}
'
```

This endpoint will return a [Result](/api-reference/model.html#result) object.