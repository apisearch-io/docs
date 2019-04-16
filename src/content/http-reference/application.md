---
title: Application
description: HTTP Reference - Application
icon: angle-right
page: 2
category: HTTP Reference
template: one-column-with-toc.mustache
source: http-reference/application.md
tags:
  - http
  - reference
  - application
---

# Application API

These endpoints are part of the Application related repository. By using them
you will be able to manage your applications, your indices and the way you 
interact with them.

## Put Index

By using this endpoint you will be able to create a new index. If the index does
exist, then this action will be skipped and nothing will happen.

This is the endpoint reference

- Endpoint name - v1_put_index
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**
- Verb - **PUT**
- Body - An instance of [Config](/model.html#config) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "language": "ca",
        "store_searchable_metadata": false,
        "shards": 5,
        "replicas": 2,
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
'
```

This config value is optional, so by not providing this object, it should work
by configuring the index with default configuration.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}" \
    -H "Apisearch-token-id: {{ token }}"
```

## Get Indices

By using this endpoint, you will be able to list existing indices. If there is
no indices created, this action returns empty array.

Here some related model objects you may know.

- [Api Client - Index Model](/model.html#index)

This is the endpoint reference

- Endpoint name - v1_get_indices
- Path - /v1/**{{ app_id }}**/indices
- Verb - **GET**
- Headers
    - Apisearch-token-id: "{{ token_id }}"
    
> Token can be passed as well, instead of a header, by using the query parameter
> *token*

This is read-only endpoint. The first example shows how to use the token as a
header, and the second example, as a query parameter. Both examples are equals.

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices" \
    -H "Apisearch-token-id: {{ token }}"
```

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices?token={{ token }}"
```

This endpoint will return an array of [Index](/model.html#index) objects.

## Delete Index

By using this endpoint you will be able to delete an existing index. If the
index is not previously created, then this action will be skipped and nothing
will happen.

This is the endpoint reference

- Endpoint name - v1_delete_index
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**
- Verb - **DELETE**
- Headers
    - Apisearch-token-id: "{{ token_id }}"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

Let's see an example.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}" \
    -H "Apisearch-token-id: {{ token }}"
```

## Reset Index

By using this endpoint you will be able to reset an existing index. If the
index is not previously created, then this action will be skipped and nothing 
will happen.

This is the endpoint reference

- Endpoint name - v1_reset_index
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/reset
- Verb - **POST**
- Headers
    - Apisearch-token-id: "{{ token_id }}"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

Let's see an example.

```bash
curl -X POST "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/reset" \
    -H "Apisearch-token-id: {{ token }}"
```

## Configure Index

By using this endpoint you will be able to configure an existing index. If the
index does not exist, then this action will be skipped and nothing will happen.

This is the endpoint reference

- Endpoint name - v1_configure_index
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/configure
- Verb - **POST**
- Body - An instance of [Config](/model.html#config) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -X POST "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/configure" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "language": "ca",
        "store_searchable_metadata": false,
        "shards": 5,
        "replicas": 2,
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
'
```

This config value is optional, so by not providing this object, it should work
by configuring the index with default configuration.

```bash
curl -X POST "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/configure" \
    -H "Apisearch-token-id: {{ token }}"
```

This endpoint can work as well as a simple index sanitation. Internally, the
index is recreated from the scratch with no downtime. That means that the old
index configuration is maintained, and at the same time, a new index with the
desired configuration is created. After the creation and the reindex of all
existing elements, the new one is used and the old one removed. These can be
some usages of this endpoint.

- Sanitation of the index. Can be called with the same configuration once a
week, for example
- To change shards and replicas
- To reindex without searchable metadata. Note that the other way would result
empty values (can't index an array that is not actually indexed)
- To add or delete synonyms
- To change the language of the index

## Put Token

By using this endpoint you will be able to create a new App token. If the token
exists, so it's been created previously with a certain configuration, this new
token will completely overwrite the old one.

This is the endpoint reference

- Endpoint name - v1_put_token
- Path - /v1/**{{ app_id }}**/tokens/**{{ new_token }}**
- Verb - **PUT**
- Body - An instance of [Token](/model.html#token) as array.
- Headers
    - Apisearch-token-id: "{{ token }}" 
    - Content-Type: "application/json"
    
> As you can see, you will be working with two tokens here. The token which must
> be an existing token with granted permissions for this endpoint, and the
> new_token, which is the new token creating here.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way.

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -X POST "http://localhost:8100/v1/{{ app_id }}/tokens/{{ new_token }}" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "uuid": {
            "id": "aaaa"
        },
        "app_id": "1234",
        "indices": [
            "index1",
            "index2"
        ]
    }
'
```

## Delete Token

By using this endpoint you will be able to delete an existing index. If the
delete is not previously created, then this action will be skipped and nothing
will happen.

This is the endpoint reference

- Endpoint name - v1_delete_token
- Path - /v1/**{{ app_id }}**/tokens/**{{ unwanted_token }}**
- Verb - **DELETE**
- Headers
    - Apisearch-token-id: "{{ token }}"
    
> As you can see, you will be working with two tokens here. The token which must
> be an existing token with granted permissions for this endpoint, and the
> unwanted_token, which is the new token deleting here.

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

Let's see an example.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/tokens/{{ unwanted_token }}" \
    -H "Apisearch-token-id: {{ token }}"
```

## Delete Tokens

By using this endpoint you will be able to delete all existing tokens from an
app.

This is the endpoint reference

- Endpoint name - v1_delete_tokens
- Path - /v1/**{{ app_id }}**/tokens/
- Verb - **DELETE**
- Headers
    - Apisearch-token-id: "{{ token }}"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

Let's see an example.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/tokens" \
    -H "Apisearch-token-id: {{ token }}"
```

## Get Tokens

By using this endpoint you will be able to check all existing tokens inside an
existing App.

This is the endpoint reference

- Endpoint name - v1_get_tokens
- Path - /v1/**{{ app_id }}**/tokens/
- Verb - **GET**
- Headers
    - Apisearch-token-id: "{{ token }}"

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

> Token can be passed as well, instead of a header, by using the query parameter
> *token*

This is read-only endpoint. The first example shows how to use the token as a
header, and the second example, as a query parameter. Both examples are equals.

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/tokens" \
    -H "Apisearch-token-id: {{ token }}"
```

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/tokens?token={{ token }}"
```

This endpoint will return an array of [Token](/model.html#token) objects.
