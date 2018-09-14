---
title: Application API
description: Api Reference - Application
icon: angle-right
page: 2
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/application-api.md
tags:
  - apisearch reference
  - http
  - json
---

# Application API

These endpoints are part of the Application related repository. By using them
you will be able to manage your applications, your indices and the way you 
interact with them.

## Create Index

By using this endpoint you will be able to create an empty index. If the index
is already created, then this action will be skipped and nothing will happen.
Here some related model objects you may know.

- [Api Client - Index Repository](/api-client/repository.html#index)

This is the endpoint reference

- Endpoint name - v1-index-create
- Path - **/v1/index**
- Verb - **PUT**
- Query Parameters
    - app_id, **required** 
    - token, **required with permissions** 
    
The body of the endpoint should be an array with one required element, a
[IndexUUID](/api-reference/model.html#indexuuid) object as value under key
`index`, and an optional position under key `config` with a 
[Config](/api-reference/model.html#config) object as value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPUT -H "Content-Type: application/json" "http://localhost:8100/v1/index?app_id={{ your_app_id }}&token={{ your_token }}"  -d'
{
    "index": {
        "id": {{ your_index }}
    },
    "config": {
        "language": "ca",
        "store_searchable_metadata": false,
        "synonyms": [{
            "words": [
                "house",
                "building",
                "cottage"
            ]
        },
        {
            "words": [
                "large",
                "big"
            ]
        }]
    }
}
'
```

This config value is optional, so by not providing this object, it should work
by creating a new index with default configuration.

```bash
curl -XPUT -H "Content-Type: application/json" "http://localhost:8100/v1/index?app_id={{ your_app_id }}&token={{ your_token }}"  -d'
{
    "index": {
        "id": {{ your_index }}
    }
}
'
```

## List Indices

By using this endpoint, you will be able to list existing indices. If there is
no indices created, this action returns empty array.

Here some related model objects you may know.

- [Api Client - Index Model](/api-reference/model.html#index)

This is the endpoint reference

- Endpoint name - v1-index-delete
- Path - **/v1/indices**
- Verb - **GET**
- Query Parameters
    - token, **required with permissions** 
    - app_id, **required** 

This is read-only endpoint.

```bash
curl -XGET "http://localhost:8100/v1/indices?app_id={{ your_app_id }&token={{ your_token }}"
```

## Delete Index

By using this endpoint you will be able to delete an existing index. If the
index is not previously created, then this action will be skipped and nothing
will happen.

Here some related model objects you may know.

- [Api Client - Delete Repository](/api-client/repository.html#delete)

This is the endpoint reference

- Endpoint name - v1-index-delete
- Path - **/v1/index**
- Verb - **DELETE**
- Query Parameters
    - app_id, **required** 
    - index, **required** 
    - token, **required with permissions** 

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XDELETE "http://localhost:8100/v1/index?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"
```

## Reset Index

By using this endpoint you will be able to reset an existing index. If the
index is not previously created, then this action will be skipped and nothing 
will happen.

This is the endpoint reference

- Endpoint name - v1-index-reset
- Path - **/v1/index/reset**
- Verb - **POST**
- Query Parameters
    - app_id, **required** 
    - index, **required** 
    - token, **required with permissions** 

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST "http://localhost:8100/v1/index/reset?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"
```

## Configure Index

By using this endpoint you will be able to configure an existing index. If the
index does not exist, then this action will be skipped and nothing will happen.
Here some related model objects you may know.

- [Api Client - Index Repository](/api-client/repository.html#index)

This is the endpoint reference

- Endpoint name - v1-index-config
- Path - **/v1/index**
- Verb - **POST**
- Query Parameters
    - app_id, **required** 
    - index, **required** 
    - token, **required with permissions** 
    
The body of the endpoint should be an array with one optional position under
key `config` with a [Config](/api-reference/model.html#config) object as value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

> This endpoint should take the same config body as creating an index. The main
> difference is the verb and that, in this case, the index is passed as part of
> the authentication (url) instead of part of the content (body)

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST -H "Content-Type: application/json" "http://localhost:8100/v1/index?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d'
{
    "config": {
        "language": "ca",
        "store_searchable_metadata": false,
        "synonyms": [{
            "words": [
                "house",
                "building",
                "cottage"
            ]
        },
        {
            "words": [
                "large",
                "big"
            ]
        }]
    }
}
'
```

This config value is optional, so by not providing this object, it should work
by creating a new index with default configuration.

```bash
curl -XPUT -H "Content-Type: application/json" "http://localhost:8100/v1/index?app_id={{ your_app_id }}&index={{ your_index }}&token={{ your_token }}"  -d''
```

## Add Token

By using this endpoint you will be able to create a new App token. If the token
exists, so it's been created previously with a certain configuration, this new
token will completely overwrite the old one.

This is the endpoint reference

- Endpoint name - v1-token-add
- Path - **/v1/token**
- Verb - **POST**
- Query Parameters
    - app_id, **required** 
    - token, **required with permissions** 
    
The body of the endpoint should be an array with one position with key `token`
and a [Token](/api-reference/model.html#token) object as value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST -H "Content-Type: application/json" "http://localhost:8100/v1/token?app_id={{ your_app_id }}&token={{ your_token }}" -d'
{
    "token": {
        "uuid": {
            "id": "aaaa"
        },
        "app_id": "1234",
        "indices": [
            "index1",
            "index2"
        ]
    }
}
'
```

## Delete Token

By using this endpoint you will be able to delete an existing index. If the
delete is not previously created, then this action will be skipped and nothing
will happen.

This is the endpoint reference

- Endpoint name - v1-token-delete
- Path - **/v1/token**
- Verb - **DELETE**
- Query Parameters
    - app_id, **required** 
    - token, **required with permissions** 
    
The body of the endpoint should be an array with one position with key `token`
and a [TokenUUID](/api-reference/model.html#tokenuuid) object as value.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST -H "Content-Type: application/json" "http://localhost:8100/v1/token?app_id={{ your_app_id }}&token={{ your_token }}" -d'
{
    "token": {
        "id": "aaaa"
    }
}
'
```

## Delete Tokens

By using this endpoint you will be able to delete all existing index.

This is the endpoint reference

- Endpoint name - v1-token-delete
- Path - **/v1/tokens**
- Verb - **DELETE**
- Query Parameters
    - app_id, **required** 
    - token, **required with permissions** 

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XPOST "http://localhost:8100/v1/tokens?app_id={{ your_app_id }}&token={{ your_token }}"
```

## Get Tokens

By using this endpoint you will be able to check all existing tokens inside an
existing App.

This is the endpoint reference

- Endpoint name - v1-token-all-tokens
- Path - **/v1/tokens**
- Verb - **GET**
- Query Parameters
    - app_id, **required** 
    - token, **required with permissions** 

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -XGET "http://localhost:8100/v1/tokens?app_id={{ your_app_id }}&token={{ your_token }}"
```

This endpoint will return an array of [Token](/api-reference/model.html#token)
objects.

## Check Health

By using this endpoint you will be able to check the service statuses and memory usage.

```bash
curl -XGET "http://localhost:8100/health?app_id={{ your_app_id }}&token={{ your_token }}"
```

This endpoint will return an array like below: 

```
{
    "status": {
        "elasticsearch": "green",
        "redis": true
    },
    "process": {
        "memory_used": 6867528
    }
}
```

## Ping
