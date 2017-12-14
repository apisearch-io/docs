---
page: 4
title: Result
description: Apisearch client - Result object
category: Client
template: one-column.mustache
source: client/result.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch model
---

# Result

A Query instance creates a Result instance. A Result is not only a set of basic
elements from our dataset (Product, Category...) but as well a set of
aggregations, result of our filters.

```php
$result = $repository->query($query);
```

You can retrieve as well all elements in a single array, respecting the order
defined by the Query.

```php
$results = $result->getItems();
```

If you queried by a UUID, for example, or even in any query, you can easily
retrieve the first (and more useful when is the only expected) result by using
this method

```php
$results = $result->getFirstItem();
```

Each of these methods will return an array of hydrated instances of our model (
not yours. If you want your model instances, you need to create manual
transformers.

The Result instance have some other interesting methods to retrieve some extra
information of your data set.

- getTotalElements() - get the total items in your universe. If you don't have
applied any universe filter, then you will have all of them. Otherwise, you will
have the number of elements in your universe.
- getTotalHits() - get the total hits produced by your query. This is not the
number of Items you have in your Result object, but the Items you can reach in
total by paginating along the result hits.

## Reading Aggregations

The other important part of the Result object is the Aggregation set. In order
to iterate over all Aggregations you can make a simple foreach over the result
of the `->getAggregations()` result (returns an implementation of the PHP
interface Traversable). You can access directly to an aggregation by using the
`->getAggregation($name)` method and the aggregation assigned name.

Let's analyze what a result Aggregation instance is and how useful can be in our
filtering application.

- ->getName() - The name of the aggregation. For example, when we create the
manufacturer filter, we create a new aggregation called manufacturers. This is
the used name.
- ->getCounters() - This method return an array of Counter instances. Explained
later, but as a TL;DR, this is an object where each option returned by the
aggregation (in the last example, each manufacturer available for filtering) has
the information like totals.
- ->isFilter() - The applied filter application type is an exclusive one, like
MUST_ALL*
- ->hasLevels() - The applied filter application type is a leveled one, like
MUST_ALL_WITH_LEVELS
- ->getTotalElements - Total elements of the aggregation.
- ->getActiveElements - Array of all the elements active (all elements passed
through the filter). Each active element is defined as a counter as well.
- ->sortByName() - Sort all counters by its name. This method has only internal
effects and no result is provided

## Aggregation Counter

Each aggregation, mainly, is composed by a name and a set of counters. Each one
has these methods.

- ->getId() - Id of the counter
- ->getName() - Name of the counter. You might want to print this value after a
possible translation (for example for tags).
- ->getLevel() - Useful for leveled filters. In that case, each counter (for
example, each returned available category will have the level). By default, 1.
- ->isUsed() - Does this counter belongs to an active element?
- ->getN() - Number of results in your database having this element (for
example, number of item with the category Adidas). This is the number
commonly printed in your app.

```
[x] Rebook (73)
[x] Nike (12)
[ ] Adidas (34)
```

This is all you need to know about the Result objects. This objects architecture
will allow you to print all the final information for your final user.

## Reading Suggestions

If your query had the suggests enabled, then you will find some suggestions in
your Result instance by using the getter method.

```php
$suggests = $result->getSuggests();
```

Each suggest is defined as an array of non unique strings.