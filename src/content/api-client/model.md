---
page: 2
icon: angle-right
title: Model
description: Apisearch model
category: API Client
template: one-column-with-toc.mustache
source: api-client/model.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch model
---

# Model

The library provides you a set of model objects. All repositories will work
using them, so please, be sure you understand every part of the model before any
integration.

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
* `Coordinate` - An Item can be geolocated in space, so an instance of Coordinate
can be injected here. This value is not required.

Let's see an example of an item.

``` yml
id: 4303ui203
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
    - 4303ui203
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

Before start building our first Item, let's see another object we need to know
in order to use the factory methods inside Item object.

## ItemUUID

Remember that we said that the id field in Item only is unique in the universe
of the entities with same type? Then, we need a representation of this Unique
id.

And this representation is the object ItemUUID. A simple class that contains an
id and a type. Let's see how to build one of these.

```php
$itemUUID = new ItemUUID('4303ui203', 'product');
```

This is a real Unique Id representation of our model, and this instance should
be unique in all our universe.

## Building an Item

So let's build our first Item instance. Because an Item can be build by 
different ways, we will use static factories instead of the private 
*__construct* method.

If you remember, all data but id and type is not required, so a simple
implementation of a new Item could be as simple as that.

```php
$itemUUID = new ItemUUID('4303ui203', 'product');
$item = Item::create($itemUUID);
```

This Item would not have any parameter, and would be equivalent to this piece of
code.

```php
$itemUUID = new ItemUUID('4303ui203', 'product');
$item = Item::create(
    $itemUUID,
    [], // Metadata
    [], // Indexed Metadata
    [], // Searchable Metadata
    [], // Exact Matching Metadata
    []  // Suggest elements
);
```

Lets add some extra data to have a nice representation of our first example.

```php
$itemUUID = new ItemUUID('4303ui203', 'product');
$item = Item::create(
    $itemUUID,
    [
        'name' => 'T-shirt blue and red',
        'description' => 'This is an amazing T-shirt'
        'ean' => 7827298738293
    ], 
    [
        'sizes' => [
            'M',
            'L',
            'XL',
        ],
        'colors' => [
            'Blue',
            'Red',
        ],
        'price' => 10,
        'old_price => 15,
        'brand' => 'Supershirts',
        'created_at' => new DateTime(),
    ],
    [
        'name' => 'T-shirt blue and red',
        'description', 'This is an amazing T-shirt',
        'brand', 'Supershirts',
    ],
    [
        '4303ui203',
        '7827298738293'
    ],
    [
        'T-shirt'
    ]
);
```

This Item would map exactly as shown in the first example.

## Coordinate

A simple Coordinate is composed by a latitude and a longitude values. That
simple. Both values are float formatted.

```php
$itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
```

## Located Item

If you want to create a located Item, then you can use the static construct
method `createLocated`. Because a located item must have a location, otherwise
this would be a conventional Item, then both an ItemUUID and Coordinate
instances must be passed as parameters.

```php
$itemUUID = new ItemUUID('12345', 'product');
$itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
$item = Item::createLocated(
    $itemUUID,
    $itemCoordinate
);
```

As before, this method allow all other parameters to be defined after the
coordinate.

```php
$itemUUID = new ItemUUID('12345', 'product');
$itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
$item = Item::createLocated(
    $itemUUID,
    $itemCoordinate,
    [], // Metadata
    [], // Indexed Metadata
    [], // Searchable Metadata
    [], // Exact Matching Metadata
    []  // Suggest elements
);
```

## Item manipulation

After the creation of an Item instance, or even after its retrieval from the
repository, you can manage all metadata (single metadata and indexed metadata)
values by using the specific getters and setters.

```php
$metadata = $item->getMetadata();
$metadata['something'] = 'value';
$item->setMetadata($metadata);
$item->addMetadata('another_thing', 'another_value');
```

In order to provide an object as much resistant as possible in front of changes,
you can consider all metadata data sets as a unique data set, even if internally
you have divided it in two different arrays. For example, if you have a field
called *price* and at the beginning of your project definition this value is not
going to be indexed, then you should store it inside metadata. Then, in your 
project, if you will access to this value by using the `getMetadata` getter, and
accessing to the desired position.

```php
$item->getMetadata()['price'];
```

But what happens if your price needs to be indexed? Then you should change your
indexing point, and instead of placing the element as a simple metadata, you
should place it as an indexed metadata. So, what happens with all the code
points where you've been requiring the price value? You should change it
well, right?

This will not work anymore

```php
$item->getMetadata()['price'];
```

Instead of that, you'll need to start using this

```php
$item->getIndexedMetadata()['price'];
```

Well, this would be something that may cause you too many code changes, where
should be something insignificant.

In order to avoid this, you should take some decisions in your model.

* Don't repeat keys inside your metadata and indexed_metadata arrays.
* When you request a metadata value, use the `->get($fieldName)` method. This
will return the metadata value accessing all metadata packages at the same time.

In this example, price will be retrieved both from metadata and
indexed_metadata, so even if you change price from one to the other, nothing bad
will happen :)

```php
$item->get('price');
```

## Location Ranges

When talking about located items, and when retrieving and filtering them, we
need to know so well a small part of our model called Location Ranges. They are
related with the Coordinate class, and specifies an area containing many of
them.

There are three type of area definitions.

### A center point and a distance

Given a center point, defined as a Coordinate instance, and a distance, defined
as an integer and a distance unit (km or mi) joined in a string, you can define
a simple filtering range. You must use an object called `CoordinateAndDistance`.

```php
$locationRange = new CoordinateAndDistance(
    new Coordinate(40.9, -70.0),
    '50km'
);
```

> This is useful when using, for example, a website with active localization.
> The browser can request the localization and send the coordinates to us, so we
> can provide a better experience to the final user

### Two square sides

If you have the top-left coordinate and the bottom-right coordinate of a square,
inside of where you want to locate all the items, you can use this filter
type. In that case, you need both Coordinate instances.

```php
$locationRange = new Square(
    new Coordinate(40.9, -70.0),
    new Coordinate(39.4, -69.1),
);
```

> This is useful when working with maps. Maps are usually presented in a square
> visualization mode, so when the final user scrolls, having these two
> coordinates (top-left, bottom-right) we can look the items we want to show

### A finite set of coordinates (polygon)

You can build your own polygon having a set of coordinates. These coordinates
will draw a polygon, and all items inside the are of this polygon will be
considered as valid result.

All coordinates must be Coordinate instances.

```php
$locationRange = new Polygon(
    new Coordinate(40.9, -70.0),
    new Coordinate(40.9, -69.1),
    new Coordinate(39.4, -69.1),
    //...
);
```

You can add as many coordinates as you need in order to build the desired area.

> This is useful when the final user has any kind of drawing tool, so an
> specific polygon can be defined by any user. Useful as well when composing
> maps, for example, defining country areas as polygons.