---
root: true
page: 2
icon: barcode
title: API Reference
description: API reference for the main HTTP contract
category: API Reference
template: one-column-with-toc.mustache
source: api-reference.md
languages: ~
tags:
  - apisearch reference
  - http
  - json
---

# Api Reference

In this chapter we will expose all the HTTP contract that Apisearch exposes.
Of course, you will always be able to use Apisearch by using the clients, but if
the language you're using does'nt have a client yet, or this one is not enough
good for you, or even if you want to use directly the HTTP layer, then you will
always have this specification.

This specification is divided in two big groups. The first one is the model one,
where each model object will be explained. The second one is the exposed
endpoints, which will be using these object explained in the first part.

## Model References

These reference elements are part of the main model, so they will be used in
several repositories, and will be the angular stone of the project.

### Item

Item reference.

```json
{
  "uuid": ItemUUID,
  "metadata": mixed[],
  "indexed_metadata": mixed[],
  "searchable_metadata": mixed[],
  "exact_matching_metadata": string[],
  "suggest": string[],
  "coordinate": ?Coordinate,
  "distance": int,
  "highlights": mixed[],
  "is_promoted": bool
}
```

### ItemUUID

ItemUUID reference. The composition of this object should be unique in your
repository.

```json
{
  "id": string,
  "type": string
}
```

### User

User reference. The composition of this object should represent one and
only one user.

```json
{
  "id": string,
  "attributes": mixed[]
}
```

### Interaction

Interaction reference. Means an interaction between a user and an ItemUUID.

```json
{
  "user": User,
  "item_uuid": ItemUUID,
  "weight": int
}
```

### Coordinate

Coordinate reference. Used for object geo-localization.

```json
{
  "lat": float,
  "lon": float
}
```

### Changes

Changes reference. This object is mainly used when updating your index.

```json
[
  {
    "field": string,
    "type": int,
    "condition": ?string,
    "value": ?mixed
  }
]
```

### TokenUUID

Token UUID reference.

```json
{
  "id": string
}
```

### Token

Token reference

```json
{
  "uuid": TokenUUID,
  "app_id": string,
  "created_at": int,
  "updated_at": int,
  "indices": string[],
  "seconds_valid": int,
  "max_hits_per_query": int,
  "http_referrers": string[],
  "endpoints": string[],
  "plugins": string[],
  "ttl": int
}
```

## Query References

These elements are part of the query repository and will be used to create
queries to several repositories.

### QueryAggregation

Query Aggregation reference. Used in Query repository.

```json
{
  "name": string,
  "field": string,
  "application_type": int,
  "filter_type": string,
  "subgroup": string[],
  "sort": string[],
  "limit": int
}
```

### Filter

Filter reference. Used in Query repository.

```json
{
  "field": string,
  "values": mixed[],
  "application_type": int,
  "filter_type": string,
  "filter_terms": string[]
}
```

### ScoreStrategy

Score Strategy reference. Used in Query Repository

```json
{
  "type": int,
  "function": ?string
}
```

### SortBy

Sortby reference. Used in Query Repository

```json
[
    {
      "type": int,
      "filter": ?Filter,
      "mode": string
      "indexed_metadata.%field_name%": {
        "order": string,
        "coordinate": ?Coordinate
      }
    }
]
```

### Query

Query reference.

```json
{
  "q": string,
  "coordinate": ?Coordinate,
  "filters": Filter[],
  "universe_filters": Filter[],
  "aggregations": QueryAggregation[],
  "sort": SortBy,
  "page": int,
  "size": int,
  "results_enabled": bool,
  "suggestions_enabled": bool,
  "highlight_enabled": bool,
  "aggregations_enabled": bool,
  "filter_fields": string[],
  "score_strategy": ?ScoreStrategy,
  "user": ?User,
  "items_promoted": ItemUUID[]
}
```

### Event

Event reference

```json
{
  "consistency_hash": string,
  "name": string,
  "payload": string,
  "indexable_payload": mixed,
  "occurred_on": int
}
```

### Log

Log reference

```json
{
  "id": string,
  "type": string,
  "payload": string,
  "occurred_on": int
}
```

## Result References

These elements compose all the possible results that all repositories can return
to you.

### Counter

Counter reference. Each of them can be understood as an aggregation result.

```json
{
  "values": string[],
  "used": bool,
  "n": int
}
```

### ResultAggregation

Result aggregation reference. Used for Results.

```json
{
  "name": string,
  "counters": Counter[],
  "application_type": int,
  "total_elements": int,
  "active_elements": Counter[],
  "highest_active_level": int
}
```

### ResultAggregations

Result aggregations reference. Used for Results.

```json
{
  "total_elements": int,
  "aggregations": ResultAggregation[]
}
```

## Result

Result reference.

```json
{
  "query": Query,
  "total_items": int,
  "total_hits": int,
  "items": Item[],
  "aggregations": ResultAggregations,
  "suggests": string[]
}
```

## Events

Events Result reference

```json
{
  "query": Query,
  "total_hits": int,
  "events": Event[],
  "aggregations": ResultAggregations
}
```

## Logs

Logs Result reference

```json
{
  "query": Query,
  "total_hits": int,
  "logs": Log[],
  "aggregations": ResultAggregations
}
```

## Endpoints References

These are the repositories endpoints. All of them will share these responses.

### Add Interaction

Add a new interaction inside the system.

```yml
Path : /v1/interaction
Verb : GET
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    interaction: Interaction
```

### Add Token

Add a new token inside the system. If the token already exists, this new Token
will overwrite the old one.

```yml
Path - /v1/token
Verb - POST
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    - token: Token
```

### Configure Index

Configure the index once this one is already created.

```yml
Path - /v1/index
Verb - PUT
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    - config: Config
```

### Create Events Index

Create events index if this one is not created

### Create Index
### Create Logs Index
### Delete all Interactions
### Delete Events Index
### Delete Index
### Delete Logs Index
### Delete Token
### Delete Tokens
### Index Items
### Reset Index
### Update Items


### Check Health
### Check Index
### Get Tokens
### Ping
### Query
### Query Events
### Query Logs