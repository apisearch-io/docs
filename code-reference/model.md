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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\AppUUID;

$appUUID = AppUUID::createFromArray([
    'id' => '12345',
]);
```

#### ** Json **
```json
{
  "id": "12345"
}
```

#### ** Javascript **
```javascript
const appUUID = AppUUID.createFromArray({
    "id": "12345"
});
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\IndexUUID;

$indexUUID = IndexUUID::createFromArray([
    'id' => '12345',
]);
```

#### ** Json **
```json
{
  "id": "12345"
}
```

#### ** Javascript **
```javascript
const indexUUID = IndexUUID.createFromArray({
    "id": "12345"
});
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\Index;
use Apisearch\Model\IndexUUID;
use Apisearch\Model\AppUUID;

$index = Index::createFromArray([
    'uuid' => IndexUUID::createById("1234"),
    'app_uuid' => AppUUID::createById("5678"),
    'doc_count' => 0,
    'is_ok' => true,
    'size' => '10mb',
]);

```

#### ** Json **
```json
{
  "app_id": "test",
  "name": "default",
  "doc_count": 0,
  "is_ok": true,
  "size": "10mb"
}
```

#### ** Javascript **
```javascript
const index = Index.createFromArray({
    'uuid': IndexUUID.createById("1234"),
    'app_uuid': AppUUID.createById("5678"),
    'doc_count': 0,
    'is_ok': true,
    'size': '10mb'
});
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\ItemUUID;

$itemUUID = ItemUUID::createFromArray([
    'id' => '12345',
    'type' => 'product'
]);
```

#### ** Json **
```json
{
  "id": "12345",
  "type": "product"
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

* Our product with ID udsio-dsadsa-dsdaa is mapped as an Item
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
* If the final user searches exactly by *udsio-dsadsa-dsdaa* or *7827298738293*, this
Item will be part of the result as well.
* If you have suggestions enabled, and if the final user start searches by
string *T-shi*, this item will add a suggestion of *T-shirt*. This is completely
different from the search fields.

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\Item;

$item = Item::createFromArray([
    'uuid' => [
        'id' => '12345',
        'type' => 'product'
    ],
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

#### ** Json **
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->


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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\User;

$user = User::createFromArray([
    'id' => "6789",
    'attributes' => [
        'genre' => 1,
        'year' => 1985
    ],
]);
```

#### ** Json **
```json
{
  "id": "6789",
  "attributes": {
    "genre": 1,
    "year": 1985
  }
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\User\Interaction;

$interaction = Interaction::createFromArray([
    'user' => [
        'id' => "6789",
        'attributes' => [
            'genre' => 1,
            'year'=> 1985
        ],
    ],
    'item_uuid' => [
        'id' => '1234',
        'type' => 'product'
    ],
    'weight' => 100
]);
```

#### ** Json **
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\Coordinate;

$coordinate = Coordinate::createFromArray([
    'lat' => 1.34,
    'lon' => -3.51,
]);
```

#### ** Json **
```json
{
  "lat": 1.34,
  "lon": -3.51
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\Changes;

$change = Changes::createFromArray([
    'field' => 'indexed_metadata.category_id',
    'type' => Changes::TYPE_VALUE,
    'condition' => 'indexed_metadata.category_id == 10',
    'value' => 15
]);
```

#### ** Json **
```json
{
  "field": "indexed_metadata.category_id",
  "type": 1,
  "condition": "indexed_metadata.category_id == 10",
  "value": 15
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

## TokenUUID

Token UUID reference.

```
{
  "id": !string
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\TokenUUID;

$tokenUUID = TokenUUID::createFromArray([
    'id' => 'aaaa',
]);
```

#### ** Json **
```json
{
  "id": "aaaa"
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\Token;

$token = Token::createFromArray([
    'uuid' => [
        'id' => 'aaaa'
    ],
    'app_id' => '1234',
    'created_at' => 326736728,
    'updated_at' => 326736728,
    'indices' => [
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
            'apisearch.com'
        ],
    ]
]);
```

#### ** Json **
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
  "metadata": {
    "seconds_valid": 3600,
    "http_referrers": [
      "apisearch.io",
      "apisearch.com"
    ]
  }
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

## Synonym

Synonym representation.

```
{
  "words": ?string[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Config\Synonym;

$synonym = Synonym::createFromArray([
    'words' => [
        'house',
        'building',
        'cottage'
    ]
]);
```

#### ** Json **
```json
{
  "words": [
    "house",
    "building",
    "cottage"
  ]
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Config\Config;

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

#### ** Json **
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

#### ** Javascript **
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
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Query\Aggregation as QueryAggregation;
use Apisearch\Query\Filter;

$aggregation = QueryAggregation::createFromArray([
    'name' => 'category',
    'field' => 'category_id',
    'application_type' => Filter::MUST_ALL,
    'filter_type' => Filter::TYPE_FIELD,
    'sort' => QueryAggregation::SORT_BY_COUNT_ASC,
    'limit' => 10
]);
```

#### ** Json **
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Query\Filter;

$filter = Filter::createFromArray([
    'field' => 'category_id',
    'values' => [10, 12],
    'application_type' => Filter::MUST_ALL,
    'filter_type' => Filter::TYPE_FIELD,
]);
```

#### ** Json **
```json
{
  "field": "category_id",
  "values": [10,12],
  "application_type": 4,
  "filter_type": "field"
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

## ScoreStrategies

A set of ScoreStrategy instances, and the way they are related

```
{
  "score_strategies": ?ScoreStrategy[],
  "score_mode": ?string
}
```

You can add as many ScoreStrategy instances you want. Th score mode will
determine how the final value is built having each one of the specific values
given by each of the ScoreStrategy definitions.

<!-- tabs:start -->
#### ** PHP **
```php

ScoreStrategies::createEmpty(ScoreStrategies::SUM)
    ->addScoreStrategy($scoreStrategy1)
    ->addScoreStrategy($scoreStrategy2)
;

```

#### ** Json **
```json
@TODO
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Query\ScoreStrategy;

ScoreStrategy::createFromArray([
    'type' => ScoreStrategy::CUSTOM_FUNCTION,
    'function' => '_score + 10'
]);
```

#### ** Json **
```json
{
  "type": 2,
  "function": "_score + 10"
}
```

#### ** Javascript **
```javascript
ScoreStrategy.createFromArray({
    'type': CUSTOM_FUNCTION,
    'function': "_score + 10"
})
```
<!-- tabs:end -->

## SortBy

Sortby reference. Used in Query Repository

```
[
    {
      "type": !string,
      "field": ?string
      "filter": ?Filter,
      "mode": ?string,
      "order": !string,
      "function": ?string,
      "coordinate": ?Coordinate,
    }
]
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Query\SortBy;

$sortBy = SortBy::createFromArray([
    'type' => SortBy::TYPE_FIELD,
    'field' => 'indexed_metadata.category_id',
    'mode' => SortBy::MODE_AVG,
    'order' => SortBy::ASC
]);
```

#### ** Json **
```json
{
  "type": "field",
  "field": "indexed_metadata.category_id",
  "mode": "avg",
  "order": "asc"
}
```

#### ** Javascript **
```javascript
sortBy = SortBy.createFromArray({
    "type": "field",
    "field": "indexed_metadata.category_id",
    "mode": "avg",
    "order": "asc"
})
```
<!-- tabs:end -->

## Query

Query reference.

```
{
  "uuid": ?string (default null)
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
  "searchable_fields": ?string[],
  "score_strategies": ?ScoreStrategies,
  "fuzziness": ?float|string|string[],
  "user": ?User,
  "subqueries": ?Query[],
  "items_promoted": ?ItemUUID[],
  "index_uuid": ?IndexUUID
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Query\Query;
use Apisearch\Query\Filter;
use Apisearch\Query\Aggregation;
use Apisearch\Query\SortBy;

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
    'sort' => [
        [
            'type' => SortBy::TYPE_FIELD,
            'field' => 'indexed_metadata.category_id',
            'order' => SortBy::ASC
        ]
    ],
    'fuzziness' => 'AUTO',
    'page' => 1,
    'size' => 10
]);
```

#### ** Json **
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
  "sort": [
    {
      "type": "field",
      "field": "indexed_metadata.category_id",
      "order": "asc"
    }
  ],
  "fuzziness": "AUTO",
  "page": 1,
  "size": 10
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Result\Counter;

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

#### ** Json **
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Result\Aggregation as ResultAggregation;
use Apisearch\Query\Filter;

$resultAggregation = ResultAggregation::createFromArray([
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
    'application_type' => Filter::MUST_ALL,
    'total_elements' => 1002
]);
```

#### ** Json **
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

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

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Result\Aggregation as ResultAggregation;

$aggregations = ResultAggregation::createFromArray([
    'total_elements' => 1002,
    'aggregations' => [
    
    ]
]);
```

#### ** Json **
```json
{
  "total_elements": 1002,
  "aggregations": []
}
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

## Result

Result reference.

```
{
  "query_uuid": string,
  "total_items": ?int (default 0),
  "total_hits": ?int (default 0),
  "items": ?Item[],
  "aggregations": ?ResultAggregations,
  "suggests": ?string[]
}
```

Some examples for you. Feel free to change the language of your examples in the
top right of the website.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Result\Result;

$result = Result::createFromArray([
    'query_uuid' => 'f7d9f7ds',
    'total_items' => 500,
    'total_hits' => 1,
    'items' => [
        [
            'uuid' => [
                'id' => '1234',
                'type' => 'product'
            ],
            'searchable_metadata' => [
                'name' => 'Hello, my new product'
            ]
        ]
    ],
    'suggests' => ['product']
]);
```

#### ** Json **
```json
{
  "query_uuid": "f7d9f7ds",
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

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->
