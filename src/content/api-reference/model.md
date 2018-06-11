---
title: Model
description: Api Reference - Model
icon: angle-right
page: 1
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/model.md
languages: 
  - php
  - javascript
  - json
tags:
  - apisearch reference
  - http
  - json
---
## Model Reference

### ItemUUID

ItemUUID reference. The composition of this object should be unique in your
repository.

```
{
  "id": string,
  "type": string
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$itemUUID = ItemUUID::createFromArray([
    'id' => '12345',
    'type' => 'product'
]);
```
```json
{
  "id": "12345",
  "type": "product"
}
```

### Item

Item reference. This is the representation of all your searchable elements.
Inside this model class you will be able to work with all your data and classify
as ready to be indexed or searched by.

```
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

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$item = Item::createFromArray([
    'uuid' => [
        'id' => '12345',
        'type' => 'product'
    ),
    'metadata' => [
        'title' => 'My Product',
        'description' => 'This is my product'
    ],
    'indexed_metadata' => [
        'price' => 2000,
        'category_id' => [12, 13]
    ],
    'searchable_metadata' => [
        'title' => 'My product',
    ],
    'exact_matching_metadata' => ['12345'],
    'suggest' => ['product'],
    'coordinate' => [
        'lat' => 1.23,
        'lon' => -5.34
    ]
]);
```
```json
{
  "uuid": {
    "id": "12345",
    "type": "product"
  },
  "metadata": {
    "title": "My Product",
    "description": "This is my product"
  },
  "indexed_metadata": {
    "price": 2000,
    "category_id": [12, 13]
  },
  "searchable_metadata": {
    "title": "My Product"
  },
  "exact_matching_metadata": ["12345"],
  "suggest": ["product"],
  "coordinate": {
    "lat": 1.23,
    "lon": -5.34
  }
}
```

### User

User reference. The composition of this object should represent one and
only one user. You should place inside all user related information that will be
used to determine some specific actions (For example, for machine learning
plugins, you may use the born year, or the gender id).

```
{
  "id": string,
  "attributes": mixed[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$user = User::createFromArray([
    'id' => "6789",
    'attributes' => [
        'genre': 1,
        'year': 1985
    ],
]);
```
```json
{
  "id": "6789",
  "attributes": {
    "genre": 1,
    "year": 1985
  }
}
```

### Interaction

Interaction reference. Means an interaction between a user and an ItemUUID.

```
{
  "user": User,
  "item_uuid": ItemUUID,
  "weight": int
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$interaction = Interaction::createFromArray([
    'user' => [
        'id' => "6789",
        'attributes' => [
            'genre': 1,
            'year': 1985
        ],
    ],
    'item_uuid' => [
        'id': '1234',
        'type': 'product'
    ],
    'weight' => 100
]);
```
```json
{
  "user": {
    "id": "6789",
    "attributes": {
      "genre": 1,
      "year": 1985
    }
  },
  "item_uuid": {
    "id": "1234",
    "type": "product"
  },
  "weight": 100
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

### Result

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

### Events

Events Result reference

```json
{
  "query": Query,
  "total_hits": int,
  "events": Event[],
  "aggregations": ResultAggregations
}
```

### Logs

Logs Result reference

```json
{
  "query": Query,
  "total_hits": int,
  "logs": Log[],
  "aggregations": ResultAggregations
}
```