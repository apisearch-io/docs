---
page: 3
title: Query
description: Apisearch client - Query object
category: API Client
template: one-column-with-toc.mustache
source: api-client/query.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch model
---

# Query

Knowing how our model is defined, let's start by knowing how to make a simple
Query Request. Query objects will give us the possibility of communication
between our project and the server by just using some object methods, and by
using a single pattern called builder.

## Building a Query

Let's start with something really easy.

```
$query = Query::create("something");
```

That simple. This small query will look for all entities in the repository,
Scoring each of the results containing the word "something" by hit scoring. The
best the first.

> Sorting by scoring means that, the best appearance the word "something" has 
> inside each result, the better punctuation has.

Let's make something a little bit harder. Let's take only the first 100 elements
of the second page (from the result 101 to the 200). By default, is none of
these last values are defined, you will request the first 10 results.

```php
$query = Query::create(
    "something", // The query string
    2,           // The page we want to retrieve
    100          // How many items do we want?
);
```

That's it, that easy :)

If you want to match all elements, you can just pass an empty string as the
first parameter or use the search-everything static factory method. In this
second method you will query the first 1000 elements.

```php
$query = Query::create('');
$query = Query::createMatchAll();
```

Finally, you can create a query to find one ore more specific elements from your
database. For this reason, there are two special static factory methods
specifically create to make these two scenarios so easy.

We will use [ItemUUIDs](#itemUUID) here in both cases.

```php
$query = Query::createByUUID(new ItemUUID('12', 'book'));
$query = Query::createByUUIDs([
    new ItemUUID('12', 'book'),
    new ItemUUID('123', 'book'),
    new ItemUUID('332', 'book'),
    new ItemUUID('555', 'book'),
    new ItemUUID('heavy', 'book'),
]);
```

The order is not important here, and the result format will be exactly the same
than any other type of queries.

## Filters

Once a new Query is created you can start by filtering your results. This
library provides a developer friendly way for defining filters by exposing you a
nice set of public methods.

Before starting by using filters, let's explain what an application type is and
the different values we have.

An **application type** is the way a filter is applied in your data set. For
example, if we want to filter our results by two categories, we want all the
results containing all the categories? We want all results containing at least
one of the defined categories? That's the application type.

Let's see all available types

* `Filter::MUST_ALL` - All results must match all filter elements
* `Filter::MUST_ALL_WITH_LEVELS` - All results must match all filter elements, but
when aggregating, only facets with the minor level encountered will be shown.
E.g. categories.
* `Filter::AT_LEAST_ONE` - At least one element must match.
* `Filter::EXCLUDE` - Items should be excluded from results

Every time we create a new filter, we must determine the type of this filter
application. Depending on that value, the filter will cause different values and
the resulting aggregation (facet) will change, even on your screen. Let's take a
look at the different filters we can apply.

## Must all with levels

An special explanation of this aggregation type.

Imagine your item is categorized with a tree-like structure.

- A - A1, A2
- B - B1, B2, B3
- C - C1

You item could be related with a first-level category, and with one if its 
subcategories. For example, your Item is categorized as A and A2 at the same
time.In that case you should relate your item with both, but adding an extra
field in your categories called *level*. The level of the category.

When you print these aggregations and you've defined this categorization as 
MUST_ALL_WITH_LEVELS, you will print only these categories with the current
level. So, if you don't have any filter applied, you should be able to filter
only by first level categories.

- [ ] Category A
- [ ] Category B
- [ ] Category C

So what happens when we apply the A filter? Then, and because A has two children
A1 and A2, the aggregations will appear like that.

- [x] Category A
- [ ] Category A1
- [ ] Category A2

## Filter types

We will mainly talk about two different filter types, and it is very important
for you to understand both, why are they important and where to use each one.

First of all, we have something called Universe. We will call Universe to the
total set of Results. No matter the type, no matter the ID. Each Item accessible
by our API is part of our Universe.

In our website, or in our app, inside each landing page or screen we will want
to work with the entire Universe or with a subset of it, so this first step will
require us to use the filterUniverse methods.

``` php
$query = Query::createMatchAll()
    ->filterUniverseByTypes(['A', 'B']);
```

Once our Universe is properly defined, then we have to let the user navigate
through this universe by using the standard filters.

``` php
$query = Query::createMatchAll()
    ->filterUniverseByTypes(['A', 'B'])
    ->filterBy('brand', 'brand', ['Superbrand']);
```

Each filter strategy is documented for both universe and regular filters. As you
will see both methods will always change a little bit (regular filters will
always have a name as first parameter in order to relate later with a possible
aggregation).

## Filtering by Type

So, try to imagine an environment when, even you have types A, B and C, you only
want to work with A and B. In this environment C is not welcomed, and you don't
want C Items to be in any set of results.

Then, all queries inside this environment will need to filter the entire
universe by types A and B. Let's see how to do it.

``` php
$query = Query::createMatchAll()
    ->filterUniverseByTypes(['A', 'B']);
```

All possible results will only include A and B. Think about this filter as a
permanent filter executed before all others.

Then you can use regular Filtering by type by using this method

``` php
$query = Query::createMatchAll()
    ->filterUniverseByTypes(['A', 'B'])
    ->filterByTypes(['A']);
```

But alert ! This seems to be exactly the same, right? Well, in this case we are
filtering by Types A and B, and then by type A, so results would only include A
types. That would be completely equivalent to filter the entire universe once by
type A.

Well, indeed. This would only work if your application has not aggregations nor
any kind of interaction with your user, where can filter manually by clicking
some kind of links.

Once Universe is filtered, and if you aggregate your values (in this case,
types), Results will contain only types A, but aggregations will still contain
all of them that are actually existing in the filtered Universe, so in this case
user would see something like this.

```
[x] Type A
[ ] Type B
```

We could even have something like that

``` php
$query = Query::createMatchAll()
    ->filterUniverseByTypes(['A', 'B'])
    ->filterByTypes(['A', 'B']);
```

With a result like that

```
[x] Type A
[x] Type B
```

While if we have this implementation, ignoring our Universe filter, considering
that our filter is already working properly

``` php
$query = Query::createMatchAll()
    ->filterByTypes(['A', 'B']);
```

Then, our result would be something like that, so our Universe is not filtered
anymore and is composed by the total set of Items, including the C types.

``` php
[x] Type A
[x] Type B
[ ] Type C
```

On the other hand, if we only want the set of results matching your filter types
without the aggregations, we can also set a second boolean parameter to disable 
aggregations (by default is set to `true`).

``` php
$query = Query::createMatchAll()
    ->filterByTypes(
        ['A', 'B']
        false
    );
```

A third and last parameter can be set to sort the aggregations result. By default, 
this parameter is set to *SORT_BY_COUNT_DESC*.

``` php
$query = Query::createMatchAll()
    ->filterByTypes(
        ['A', 'B']
        true,
        Aggregation::SORT_BY_COUNT_ASC
    );
```

## Filtering By Id

You can filter universe as well by ids. In that case, you can image that, no
matter what or how filters you add. Your result set will be of maximum 3 items.

``` php
$query = Query::createMatchAll()
    ->filterUniverseByIds(['10', '11', '12']);
```

This is only useful if you work with a limited set of Items known by Ids.

Of course, filtering by ID is available as well inside your defined universe.
This is useful, for example, if you ID is a human readable value, and you want
to select a set of items from a list.

``` php
$query = Query::createMatchAll()
    ->filterByIds(['10', '11', '12']);
```

## Filter by location

You can filter your universe as well by Location if your Items are Geolocated.
This will allow you to work only with some Items positioned in a certain area.
You can use any of [Location Ranges](#location-ranges) explained previously.

```php
$query = Query::createMatchAll()
    ->filterUniverseByLocation(new CoordinateAndDistance(
        new Coordinate(40.9, -70.0),
        '50km'
    ))
```

Location is something that you should filter by just once. And because you can't
aggregate by locations, it has'nt make sense at all to have both filters,
universe and regular, so they both mean exactly the same.

## Filter by range

You can filter your universe as well by range. Depending if the filter uses a
date range or not, you should use one of these methods. Let's imagine a landing
page where to list all T-shirts with low price (up to 20 euros). We want to add
only elements created during last month

``` php
$from = // Date Atom of start of the month
$to = // Date Atom of the end of the month
$query = Query::createMatchAll()
    ->filterUniverseByRange('price', ['0..20'], Filter::MUST_ALL)
    ->filterUniverseByDateRange('created_at', ["$from..$to"], Filter::MUST_ALL);
```

Furthermore, once defined your subset of available values, you can use the range
filter the same way as others.

This filter is considerably useful when filtering by price, by rating or by any
other numeric value (discount percentage...). Let's work with the example of
price.

Let's consider that we want all items with a price value from 50 to 60, and 
from 90 to 100 euros. Let's consider as well that this price value is part of
the indexed metadata. Let's build the filter.

```php
Query::createMatchAll()
    ->filterByRange(
        'price',
        'price',
        [],
        ['50..60', '90..100']
    );
```

Let's analyze what we created here. First of all, the name of the filter.
Because this is an open filter, we must define the filter field by hand. In our
case the range will be applied over the `price` field, but could be applied
over the `real_price` field, after some discount appliance, or the 
`price_discount` as well.

This will allow you to define several range filters over the same field.

The third option is for faceting, we will check it later.
The fourth option is the important one. Is an array of ranges, and each range is
defined that way, separated by the string `..`.

By default, a range is defined as Filter::AT_LEAST_ONE, so in that case, each
option adds results to the final set. We can change the behavior by changing the
fifth parameter, and we can disable the auto-generated aggregation by changing
the sixth one.

```php
Query::createMatchAll()
    ->filterByRange(
        'price',
        'real_price',
        [],
        ['50..60', '90..100'],
        FILTER::MUST_ALL,
        false
    );
```

As you can see, this last example would return an empty set of elements as we
don't have any item with a price lower than 60 euros and, at the same time,
higher than 90. Basics of logic of sets.

## Filter by field

Finally, and of course, you can filter your universe by any value inserted in
your indexed_metadata array. Let's take our first example, and let's create a
landing page for only products from brand *Supershirts*. Other brands will not
be a possibility.

``` php
$query = Query::createMatchAll()
    ->filterUniverseBy('brand', ['Supershirts'], Filter::MUST_ALL);
```

You can filter by any field as well after universe filtering. This method have 
a first parameter called filter name. This should be unique, so two filters with 
same name will just be overridden. You can make two or more filters with 
different name over the same field. This filter name will be used as well later
when matching with existing aggregations.

```php
Query::createMatchAll()
    ->filterBy(
        'filtername',
        'field1',
        ['value1', 'value2']
    );
```

By default, this filter is defined as *AT_LEAST_ONE* but you can change this 
behavior by adding a fourth method parameter.

```php
Query::createMatchAll()
    ->filterByMeta(
        'filtername',
        'field1',
        ['value1', 'value2'],
        Filter::MUST_ALL
    );
```

> This filter works with the indexed_metadata field. Remember that the metadata
> field stores non-indexable data

By default, when you filter by meta, specific metadata field aggregation will be
enabled. Disable this aggregation by adding a fifth and last parameter, or just
override it later with a more specific aggregation configuration.

```php
Query::createMatchAll()
    ->filterBy(
        'filtername',
        'field1',
        ['value1', 'value2'],
        Filter::AT_LEAST_ONE,
        false
    );
```

## Aggregations {#query-aggregations}

Once we have applied our filters, part of the result set is what we call
aggregations. This concept is usually understood as well as facets and is the
part of your application where filters are dynamically generated by using the
total number of results in the data set.

For example, if we can filter by the item's manufacturer 'Nike', but with the 
current set of filters, there is not elements manufactured by Nike available, 
Nike should'nt be available. Otherwise, if it is, then we should have the 
capability of showing the final user the real number of Nike elements available.

This is what we call aggregations.

Each filter applied creates, unless you say otherwise, an aggregation group with
all available options for this filter. If you filter by the item Nike,
your result will come with a group called *manufacturers* and with all
other manufacturers available to be filtered, each one with the elements total
in your database.

You can create aggregations by hand, for example, if you don't really want
filters, or if the aggregation itself requires an special configuration.

```php
Query::createMatchAll()
    ->aggregateBy(
        'fieldname'
        'field1'
    );
```

Previous filters with name `fieldname` will be searched in order to create the
Result object.
You can change the order of the aggregation, so you don't have to do it later in
your process.

```php
Query::createMatchAll()
    ->aggregateBy(
        'fieldname'
        'field1',
        Filter::AT_LEAST_ONE,
        Aggregation::SORT_BY_COUNT_DESC
    );
```

You can chose between these values

- `Aggregation::SORT_BY_COUNT_DESC`
- `Aggregation::SORT_BY_COUNT_ASC`
- `Aggregation::SORT_BY_NAME_DESC`
- `Aggregation::SORT_BY_NAME_ASC`

You can limit as well the number of elements you want to return in the
aggregation. By default, there's no limit, so if your result aggregation has
10000 possible values, an array of 10000 counters will be returned. This is
usually not good for performance.

```php
Query::createMatchAll()
    ->aggregateBy(
        'fieldname'
        'field1',
        Filter::AT_LEAST_ONE,
        Aggregation::SORT_BY_COUNT_DESC,
        Aggregation::NO_LIMIT
    );
```

Aggregations can be enabled or disabled by using these flag methods. This flag
will override all behaviors from all filter methods (remember that when
filtering by some fields, for example Types, you can enable or disable a
specific aggregation). If aggregations are enabled, then the behavior will not
change and each field specific behaviors will be used. If disable, all field
specific behaviors will be disabled.

```php
Query::create('')
    ->disableAggregations()
;
```

In this case, aggregations are specifically enabled by Types setting the second 
parameter to `true`, but disabled by flag, so no aggregations will be requested.

```php
Query::createMatchAll()
    ->filterByTypes(
        ['product'],
        true
    )
    ->disabledAggregations()
;
```

## Sort by field

You can sort your results, of course. The Query object provides one method for
this, and the SortBy object defines a prebuilt set of sorting types ready to be
used by you. You can define the sorting field and the type by yourself.

```php
Query::createMatchAll()
    ->sortBy(
        ['indexed_metadata.manufacturer', 'asc']
    );

Query::createMatchAll()
    ->sortBy(
        ['indexed_metadata.name', 'desc']
    );

Query::createMatchAll()
    ->sortBy(
        ['indexed_metadata.updated_at', 'desc']
    );
```

We can use prebuilt sorts. The first one is the one applied by default when no
sorting is defined. The better score given a query, the earlier in results.
This is the list of all of them.

```php
Query::createMatchAll()
    ->sortBy(SortBy::SCORE)
    ->sortBy(SortBy::ID_ASC)
    ->sortBy(SortBy::ID_DESC)
    ->sortBy(SortBy::TYPE_ASC)
    ->sortBy(SortBy::TYPE_DESC)
;
```

When you define a sort element, you override the existing one.

## Sort by location

A set of special sorting types can sort as well by location. In order to make
this sorting work, we must create our Query instance by using the method
`createLocated()` instead of `create()`. The only difference between both is
that the first one's first parameter is a `Coordinate` instance. Therefore, 
the second parameter is the query text.

```php
$query = Query::createLocated(
    new Coordinate(40.0, -70.0),
    ''
);
```

Because the only way that could make sense when sorting by location is
requesting first of all the elements closer to us, we can only sort them by
location in an *asc* mode.

```php
$query = Query::createLocated(
        new Coordinate(40.0, -70.0), 
        ''
    )
    ->sortBy(SortBy::LOCATION_KM_ASC)
    ->sortBy(SortBy::LOCATION_MI_ASC)
;
```

Both sorting types return exactly the same results in the same order, but both
return the distance of each hit in different units. The first of all in 
kilometers and the second one in miles.

Using this sort type, we will be able to know the distance of each of the
Product instances received by using the special Product method `->getDistance()`
defined and filled only in this scenario. The result of this method is a float
value.

```php
$item->getDistance();
```

## Sort randomly

You can sort your elements in a random way by using the fast predefined value

```php
Query::createMatchAll()
    ->sortBy(SortBy::RANDOM)
;
```

## Enabling suggestions

Suggestions can be enabled or disabled by using these flag methods.

```php
Query::create('')
    ->disableAggregations()
;

Query::create('')
    ->enableAggregations()
;
```

Please, read [Reading Suggestions](#reading-suggestions) to know a little bit
more about suggestions.

## Excluding some elements

Having some kind of black list would be useful as well. For example, when
printing a related carousel given an item, and filtering by the type,
would be useful to exclude the current element from the list.

In order to do this, we will use UUIDs, so we can filter by any kind of
element only having the UUID.

```php
Query::createMatchAll()
    ->filterByTypes(
        ['product']
    )
    ->excludeUUID(new ItemUUID('10', 'product'))
;
```

In this example we are excluding the Item with ID 10 and 'product' as type.
Remember that an item is always referenced not only by the id but with a
composition between the ID and the type.

We can filter by several UUIDs as well.

```php
Query::createMatchAll()
    ->filterByTypes(
        ['product']
    )
    ->excludeUUIDs([
        new ItemUUID('10', 'product'),
        new ItemUUID('5', 'product'),
        new ItemUUID('100', 'product'),
        new ItemUUID('21', 'product'),
    ])
;
```