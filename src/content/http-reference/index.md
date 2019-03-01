---
title: Index
description: HTTP Reference - Index
icon: angle-right
page: 3
category: HTTP Reference
template: one-column-with-toc.mustache
source: http-reference/index.md
tags:
  - http
  - reference
  - index
---

# Index API

Use these endpoints to manage your index. Add items and manipulate them directly
using these endpoints.

## Index Items

By using this endpoint you will be able to add some items in your index.
Here some related model objects you may know.

- [Model - Item](/model.html#item)
- [Model - ItemUUID](/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1-items-index
- Path - **/v1/items**
- Verb - **POST**
- Query Parameters
    - app_id, **required** 
    - index, **required** 
    - token, **required with permissions** 
    
The body of this endpoint is an array with one optional position with 
key `items` and an array of [Item](/model.html#item) objects as
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

- [Model - Item](/model.html#item)
- [Model - ItemUUID](/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1-items-index
- Path - **/v1/items**
- Verb - **DELETE**
- Query Parameters
    - app_id, **required** 
    - index, **required** 
    - token, **required with permissions** 
    
The body of this endpoint is an array with one optional position with 
key `items` and an array of [ItemUUID](/model.html#itemuuid) 
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

By using this endpoint you will be able to update some items from your index
without needing to index them all once again. 

This is the endpoint reference

- Endpoint name - v1-items-update
- Path - **/v1**
- Verb - **GET**
- Query Parameters
    - app_id, **required** 
    - index, *not required, can be multiple separated by comma*
    - token, **required with permissions** 
    
By using this endpoint you will always work with two objects.

With the first one, a [Query](/model.html#query) instance, you
will be able to select all these Items that you want to change at a time. This
parameter key will be `query`. With the second one, a 
[Changes](/model.html#changes) instance, you will be able to apply 
one or more changes to the result of the previous query. This parameter key will 
be `changes`.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XDELETE -H "Content-Type: application/json" "http://localhost:8100/v1/items?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "query": [
        "q": ""
    ]
    "changes": [
        {
            "field": "new_field",
            "type": 1,
            "value": "new_value"
        },
        {
            "field": "another_field",
            "type": 1,
            "value": "new_value"
        },
        {
            "field": "counter",
            "type": 4,
            "value": "counter"
        }
    ]
}
'
```
