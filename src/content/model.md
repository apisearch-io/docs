---
root: true
page: 2
icon: window-restore
title: Model
description: Model reference
category: Model
template: one-column-with-toc.mustache
source: model.md
languages: 
  - php
  - json
  - javascript
tags:
  - model
---

# Model

In this chapter we will expose all the objects existing inside Apisearch. This
is important because across all repositories, and maybe inside specific client
implementations you will see some objects and you will know how they work
internally.

Then this is your chapter.

## AppUUID

AppUUID reference. The composition of this object should represent one and only
one application in your system.

```
{
  "id": !string,
}
```

> This value should never contain the character "_" as is reserved

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$appUUID = AppUUID::createFromArray([
    'id' => '12345',
]);
```
```json
{
  "id": "12345"
}
```
```javascript
const appUUID = AppUUID.createFromArray({
    "id": "12345"
});
```

## IndexUUID

IndexUUID reference. The composition of this object should represent one and
only one index in your application. Different applications could (but never
should) repeat UUID.

```
{
  "id": !string,
}
```

> This value should never contain the character "_" as is reserved

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$indexUUID = IndexUUID::createFromArray([
    'id' => '12345',
]);
```
```json
{
  "id": "12345"
}
```
```javascript
const indexUUID = IndexUUID.createFromArray({
    "id": "12345"
});
```

## Index 

Index reference. This is the representation of all your indices. Inside this model you can find information about your index.

```
{
  "uuid": !IndexUUID,
  "app_uuid": !AppUUID,
  "doc_count": ?int,
  "is_ok": ?boolean,
  "size": ?string
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$index = Index::createFromArray([
    'uuid' => IndexUUID::createById("1234"),
    'app_uuid' => AppUUID::createById("5678"),
    'doc_count' => 0,
    'is_ok' => true,
    'size' => '10mb',
]);

```
```json
{
  "app_id": "test",
  "name": "default",
  "doc_count": 0,
  "is_ok": true,
  "size": "10mb"
}
```
```javascript
const index = Index.createFromArray({
    'uuid': IndexUUID.createById("1234"),
    'app_uuid': AppUUID.createById("5678"),
    'doc_count': 0,
    'is_ok': true,
    'size': '10mb'
});
```

Some links of interest

* [Api Reference - AppUUID](/api-reference/model.html#appuuid)
* [Api Reference - ItemUUID](/api-reference/model.html#itemuuid)

## ItemUUID

ItemUUID reference. The composition of this object should be unique in your
repository.

```
{
  "id": !string,
  "type": !string
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

Some links of interest

* [Api Client - Item](/api-client/model.html#item)
* [Api Client - ItemUUID](/api-client/model.html#itemuuid)

## Item

The Item is the base class for this package. An Item instance represents a
single row in your read-only model, and can be mapped with any class of your own
model.

Because this platform allows you to integrate any kind of object with this Item
object, the internals of the objects are as simple as we could do, in order to
provide you as much flexibility as we could.

Lets take a look at what Items is composed by.

* `id` - A string representation of the id of the Item. This id is not required to
be unique in your model universe, but is required to be unique along all 
entities of the same type (for example, along products, this id should be
unique). This parameter is required and cannot be null.
* `type` - Because an Item can be mapped by any entity from your model, this
parameter defined what entity has been mapped. This is parameter is required and
cannot be null.
* `metadata` - An array of data-values. This data will be not processed nor 
indexed, and will only be accessible once returned results. Values for this
array can have any format. By default, an empty array is used.
* `indexed_metadata` - An array of indexed, filterable and aggregable data-values.
This data will not be searchable at all. By default, an empty array is used.
* `searchable_metadata` - An array of strings used for searching. Each string will
be decomposed by the engine and used for searching the item. By default, an 
empty array is used.
* `exact_matching_metadata` - An array of strings used for searching. Each string
will not be decomposed and will be used as it is introduced. Current item will
be returned as result only if the query string contains one or many introduced
values. By default, an empty array is used.
* `suggest` - An array of strings where each item can propose suggestions for
searching time. Strings wont be decomposed neither. By default, an empty array 
is used.
* `coordinate` - An Item can be geo located in space, so an instance of
Coordinate can be injected here. This value is not required.
* `score` - The score for an item inside a Result

Let's see an example of an item.

``` yml
id: udsio-dsadsa-dsdaa
type: product
metadata:
    name: "T-shirt blue and red"
    description: "This is an amazing T-shirt"
    ean: 7827298738293
indexed_metadata:
    sizes:
        - M
        - L
        - XL
    colors:
        - Blue
        - Red
    price: 10
    old_price: 15
    brand: Supershirts
    created_at: now()
searchable_metadata:
    name: T-shirt blue and red
    description: This is an amazing T-shirt
    brand: Supershirts
exact_matching_metadata:
    - udsio-dsadsa-dsdaa
    - 7827298738293
suggest:
    - T-shirt
```

Let's explain a little better this example

* Our product with ID 4303ui203 is mapped as an Item
* We have a name, a description and an EAN stored in the item, and because is 
not filterable not aggregable by these values, we place them in the metadata
array.
* We have other values like sizes, colors, price, old_price and brand prepared
to be filtered and aggregated by. These values will be accessible as well when
Items are provided as results.
* When final user searches on our website, this Item will be part of the result
if the search contains any of the words included as searchable_metadata (
after some transformations, will see later), so when searching by *amazing*,
this item will be a result. If searching by *Elephant*, will not.
* If the final user searches exactly by *4303ui203* or *7827298738293*, this
Item will be part of the result as well.
* If you have suggestions enabled, and if the final user start searches by
string *T-shi*, this item will add a suggestion of *T-shirt*. This is completely
different from the search fields.

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

Some links of interest

* [Api Client - Item](/api-client/model.html#item)
* [Api Client - ItemUUID](/api-client/model.html#itemuuid)

## User

User reference. The composition of this object should represent one and
only one user. You should place inside all user related information that will be
used to determine some specific actions (For example, for machine learning
plugins, you may use the born year, or the gender id).

```
{
  "id": !string,
  "attributes": ?mixed[]
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

Some links of interest

* [Api Client - Building a Query](/api-client/query.html#building-a-query)

## Interaction

Interaction reference. Means an interaction between a user and an ItemUUID.

```
{
  "user": !User,
  "item_uuid": !ItemUUID,
  "weight": !int
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

## Coordinate

Coordinate reference. Used for object geo-localization.

```
{
  "lat": !float,
  "lon": !float
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$coordinate = Coordinate::createFromArray([
    'lat' => 1.34,
    'lat' => -3.51,
]);
```
```json
{
  "lat": 1.34,
  "lon": -3.51
}
```

## Changes

Changes reference. This object is mainly used when updating your index.

```
[
  {
    "field": !string,
    "type": !int,
    "condition": ?string,
    "value": ?mixed
  }
]
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$change = Change::createFromArray([
    'field' => 'indexed_metadata.category_id',
    'type' => Changes::TYPE_VALUE,
    'condition' => 'indexed_metadata.category_id == 10',
    'value' => 15
]);
```
```json
{
  "field": "indexed_metadata.category_id",
  "type": 1,
  "condition": "indexed_metadata.category_id == 10",
  "value": 15
}
```

## TokenUUID

Token UUID reference.

```
{
  "id": !string
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$tokenUUID = TokenUUID::createFromArray([
    'id' => 'aaaa',
]);
```
```json
{
  "id": "aaaa"
}
```

Some links of interest

* [Api Client - Building a Query](/api-client/query.html#building-a-query)
* [Api Client - User query](/api-client/query.html#user-query)

## Token

Token reference. Inside the metadata array, some arrays will be able to add and
define some positions. The type will up to the plugin.

```
{
  "uuid": !TokenUUID,
  "app_id": !string,
  "created_at": !int,
  "updated_at": !int,
  "indices": ?string[],
  "endpoints": ?string[],
  "plugins": ?string[],
  "ttl": ?int (default 60 seconds),
  "metadata": mixed[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$token = Token::createFromArray([
    'uuid' => [
        'id' => 'aaaa'
    ],
    'app_id' => '1234',
    'created_at' => 326736728,
    'updated_at' => 326736728,
    'indices => [
        'default',
        'default2',
    ],
    'endpoints' => [
        'v1-query',
    ],
    'plugins' => [
        'language_split',
        'metadata_fields'
    ],
    'ttl' => 3600,
    'metadata' => [
        'seconds_valid' => 3600,
        'http_referrers' => [
            'apisearch.io',
            'apisearch.com
        ],
    ]
]);
```
```json
{
  "uuid": {
    "id": "aaaa"
  },
  "app_id": "1234",
  "created_at": 326736728,
  "updated_at": 326736728,
  "indices": [
    "default",
    "default2"
  ],
  "endpoints": ["v1-query"],
  "plugins": [
    "language_split",
    "metadata_fields"
  ],
  "ttl": 3600,
  "metadata": [
    "seconds_valid": 3600,
    "http_referrers": [
      "apisearch.io",
      "apisearch.com"
    ]
  ]
}
```

## Synonym

Synonym representation.

```
{
  "words": ?string[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$synonym = Synonym::createFromArray([
    'words' => [
        'house',
        'building',
        'cottage'
    ]
]);
```
```json
{
  "words": [
    "house",
    "building",
    "cottage"
  ]
}
```

## Config

This configuration is used when a new index instance is created or is configured
after its creation.

```
{
  "language": ?string (default null),
  "store_searchable_metadata": ?bool (default true),
  "synonyms": ?Synonym[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$immutableConfig = Config::createFromArray([
    'language' => 'ca',
    'store_searchable_metadata' => false,
    'synonyms' => [
        [
            'words' => [
                'house',
                'building',
                'cottage'
            ]
        ],
        [
            'words' => [
                'large',
                'big'
            ]
        ]
    ]
]);
```
```json
{
  "language": "ca",
  "store_searchable_metadata": false,
  "synonyms": [
    {
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
    }
  ]
}
```
```javascript
const config = Config.createFromArray({
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
});
```

## QueryAggregation

Query Aggregation reference. Used in Query repository.

```
{
  "name": !string,
  "field": ?string (default uuid.type),
  "application_type": ?int (default 8),
  "filter_type": ?string (default "field"),
  "subgroup": ?string[],
  "sort": ?string[] (default ['_count', 'desc']),
  "limit": ?int (default 0/No limit)
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$aggregation = Query\Aggregation::createFromArray([
    'name' => 'category',
    'field' => 'category_id',
    'application_type' => Filter::MUST_ALL,
    'filter_type' => Filter::TYPE_FIELD,
    'sort' => Aggregation::SORT_BY_COUNT_ASC,
    'limit' => 10
]);
```
```json
{
  "name": "category",
  "field": "category_id",
  "application_type": 4,
  "filter_type": "field",
  "sort": ["_count", "asc"],
  "limit": 10
}
```

Some links of interest

* [Building a Query](/api-client/query.html#building-a-query)
* [Query aggregations](/api-client/query.html#aggregations)

## Filter

Filter reference. Used in Query repository.

```
{
  "field": ?string (default uuid.type),
  "values": ?mixed[],
  "application_type": ?int (default 8),
  "filter_type": ?string (default "field"),
  "filter_terms": ?string[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$filter = Filter::createFromArray([
    'field' => 'category_id',
    'values' => [10, 12],
    'application_type' => Filter::MUST_ALL,
    'filter_type' => Filter::TYPE_FIELD,
]);
```
```json
{
  "field": "category_id",
  "values": [10,12],
  "application_type": 4,
  "filter_type": "field"
}
```

Some links of interest

* [Building a Query](/api-client/query.html#building-a-query)
* [Query filters](/api-client/query.html#filters)
* [Filter types](/api-client/query.html#filter-types)

## ScoreStrategy

Score Strategy reference. Used in Query Repository

```
{
  "type": ?int (default 0),
  "function": ?string
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$scoreStrategy = ScoreStrategy::createFromArray([
    'type' => ScoreStrategy::CUSTOM_FUNCTION,
    'function' => '_score + 10'
]);
```
```json
{
  "type": 2,
  "function": "_score + 10"
}
```

Some links of interest

* [Building a Query](/api-client/query.html#building-a-query)
* [Relevance Strategy](/api-client/query.html#relevance-strategy)

## SortBy

Sortby reference. Used in Query Repository

```
[
    {
      "type": ?int (default 1/field),
      "filter": ?Filter,
      "mode": !string
      "indexed_metadata.%field_name%": {
        "order": !string,
        "coordinate": ?Coordinate
      }
    }
]
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$sortBy = SortBy::createFromArray([
    'type' => SortBy::TYPE_FIELD,
    'mode' => SortBy::MODE_AVG,
    'indexed_metadata.category_id' => [
        'order': SortBy::ASC
    ]
]);
```
```json
{
  "type": 1,
  "mode": "avg",
  "indexed_metadata.category_id": {
    "order": "asc"
  }
}
```

Some links of interest

* [Building a Query](/api-client/query.html#building-a-query)
* [Sort by field](/api-client/query.html#sort-by-field)
* [Sort randomly](/api-client/query.html#sort-randomly)

## Query

Query reference.

```
{
  "q": ?string (default ""/Match all),
  "coordinate": ?Coordinate,
  "filters": ?Filter[],
  "universe_filters": ?Filter[],
  "aggregations": ?QueryAggregation[],
  "sort": ?SortBy,
  "page": ?int (default 1),
  "size": ?int (default 10),
  "results_enabled": ?bool (default true),
  "suggestions_enabled": ?bool (default false),
  "highlight_enabled": ?bool (default false),
  "aggregations_enabled": ?bool (default true),
  "filter_fields": ?string[],
  "score_strategy": ?ScoreStrategy,
  "user": ?User,
  "items_promoted": ?ItemUUID[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$query = Query::createFromArray([
    'q' => 'hello',
    'filters' => [
        [
            'field' => 'category_id',
            'values' => [10, 12],
            'application_type' => Filter::MUST_ALL,
            'filter_type' => Filter::TYPE_FIELD,
        ]
    ],
    'aggregations' => [
        [
            'name' => 'category',
            'field' => 'category_id',
            'application_type' => Filter::MUST_ALL,
            'filter_type' => Filter::TYPE_FIELD,
            'sort' => Aggregation::SORT_BY_COUNT_ASC,
            'limit' => 10
        ]
    ],
    'sort' => 'type' => SortBy::TYPE_FIELD,
        'mode' => SortBy::MODE_AVG,
        'indexed_metadata.category_id' => [
        'order': SortBy::ASC
    ],
    'page' => 1,
    'size => 10
]);
```
```json
{
  "q": "hello",
  "filters": [
    {
      "field": "category_id",
      "values": [10,12],
      "application_type": 4,
      "filter_type": "field"
    }
  ],
  "aggregations": [
    {
      "name": "category",
      "field": "category_id",
      "application_type": 4,
      "filter_type": "field",
      "sort": ["_count", "asc"],
      "limit": 10
    }
  ],
  "sort": {
    "type": 1,
    "mode": "avg",
    "indexed_metadata.category_id": {
      "order": "asc"
    }
  },
  "page": 1,
  "size": 10
}
```

Some links of interest

* [Building a Query](/api-client/query.html#building-a-query)
* [Enabling Suggestions](/api-client/query.html#enabling-suggestions)

## Event

Event reference.

```
{
  "consistency_hash": !string,
  "name": !string,
  "payload": !string,
  "indexable_payload": !array,
  "occurred_on": !int
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$event = Event::createFromArray([
    'consistency_hash' => '789ds789s7d8s9',
    'name' => 'QueryWasMade',
    'payload' => "{...}",
    "indexable_payload" => "{...}",
    "occurred_on" => 34782947389,
]);
```
```json
{
  "consistency_hash": "789ds789s7d8s9",
  "name": "QueryWasMade",
  "payload": "{...}",
  "indexable_payload": "{...}",
  "occurred_on": "{...}"
}
```

Some links of interest

* [Event Object](/api-client/event.html#event-object)
* [Event Types](/api-client/event.html#event-types)

## Log

Log reference

```
{
  "id": !string,
  "type": !string,
  "payload": !string,
  "occurred_on": !int
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$log = Log::createFromArray([
    'id' => '3478378',
    'type' => Log::TYPE_FATAL,
    'payload' => "{...}",
    "occurred_on" => 34782947389,
]);
```
```json
{
  "id": "3478378",
  "type": "fatal",
  "payload": "{...}",
  "occurred_on": "{...}"
}
```

## Counter

Counter reference. Each of them can be understood as an aggregation result.

```
{
  "values": !string[],
  "used": ?bool (default false),
  "n": !int
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$counter = Counter::createFromArray([
    'values' => [
        'id' => 12,
        'name' => 'Main Category',
        'slug' => 'main_category',
    ],
    'used' => true,
    'n' => 526
]);
```
```json
{
  "values": {
    "id": 12,
    "name": "Main Category",
    "slug": "main_category"
  },
  "used": true,
  "n": 526
}
```

Some links of interest

* [Api Client - Result](/api-client/result.html)
* [Api Client - Aggregation Counter](/api-client/result.html#aggregation-counter)

## ResultAggregation

Result aggregation reference. Used for Results.

```
{
  "name": !string,
  "counters": ?Counter[],
  "application_type": ?int (default 8),
  "total_elements": ?int (default 0),
  "active_elements": ?Counter[],
  "highest_active_level": ?int (default 0)
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$resultAggregation = Result\Aggregation::createFromArray([
    'name' => 'category_id',
    'counters' => [
        [
            'values' => [
                'id' => 12,
                'name' => 'Main Category',
                'slug' => 'main_category',
            ],
            'used' => true,
            'n' => 526
        ]
    ],
    'application_type': Filter::MUST_ALL,
    'total_elements': 1002
]);
```
```json
{
  "name": "category_id",
  "counters": [
    {
      "values": {
        "id": 12,
        "name": "Main Category",
        "slug": "main_category"
      },
      "used": true,
      "n": 526
    }
  ],
  "application_type": 4,
  "total_elements": 1002
}
```

Some links of interest

* [Api Client - Result](/api-client/result.html)
* [Api Client - Reading Aggregations](/api-client/result.html#reading-aggregations)
* [Api Client - Aggregation Counter](/api-client/result.html#aggregation-counter)

## ResultAggregations

Result aggregations reference. Used for Results.

```
{
  "total_elements": ?int (default 0),
  "aggregations": ?ResultAggregation[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$aggregations = Aggregations::createFromArray([
    'total_elements' => 1002,
    'aggregations' => [
    
    ]
]);
```
```json
{
  "total_elements": 1002,
  "aggregations": []
}
```

Some links of interest

* [Api Client - Result](/api-client/result.html)
* [Api Client - Reading Aggregations](/api-client/result.html#reading-aggregations)
* [Api Client - Aggregation Counter](/api-client/result.html#aggregation-counter)

## Result

Result reference.

```
{
  "query": !Query,
  "total_items": ?int (default 0),
  "total_hits": ?int (default 0),
  "items": ?Item[],
  "aggregations": ?ResultAggregations,
  "suggests": ?string[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

```php
$result = Result::createFromArray([
    'query' => [
        'q' => 'hola'
    ],
    'total_items' => 500,
    'total_hits' => 1,
    'items' => [
        [
            'uuid' => [
                'id' => '1234',
                'type => 'product
            ],
            'searchable_metadata' => [
                'name' => 'Hello, my new product'
            ]
        ]
    ],
    'suggests' => ['product']
]);
```
```json
{
  "query": {
    "q": "hola"
  },
  "total_items": 500,
  "total_hits": 1,
  "items": [
    {
      "uuid": {
        "id": "1234",
        "type": "product"
      },
      "searchable_metadata": {
        "name": "Hello, my new product"
      }
    }
  ],
  "suggests": ["product"]
}
```

Some links of interest

* [Api Client - Result](/api-client/result.html)
* [Api Client - Reading Suggestions](/api-client/result.html#reading-suggestions)