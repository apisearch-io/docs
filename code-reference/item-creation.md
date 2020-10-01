## Item Creation

So let's build our first Item instance. Because an Item can be build by 
different ways, we will use static factories instead of the private 
*__construct* method.

If you remember, all data but id and type is not required, so a simple
implementation of a new Item could be as simple as that.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\ItemUUID;
use Apisearch\Model\Item;

$itemUUID = new ItemUUID('4303ui203', 'product');
$item = Item::create($itemUUID);
```

#### ** Javascript **
```javascript
import {ItemUUID, Item} from "apisearch";

const itemUUID = new ItemUUID('4303ui203', 'product');
const item = Item.create(itemUUID);
```
<!-- tabs:end -->

This Item would not have any parameter, and would be equivalent to this piece of
code.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\ItemUUID;
use Apisearch\Model\Item;

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

#### ** Javascript **
```javascript
import {ItemUUID, Item} from "apisearch";

const itemUUID = new ItemUUID('4303ui203', 'product');
const item = Item.create(
    itemUUID,
    {}, // Metadata
    {}, // Indexed Metadata
    {}, // Searchable Metadata
    [], // Exact Matching Metadata
    []  // Suggest elements
);
```
<!-- tabs:end -->

Lets add some extra data to have a nice representation of our first example.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Model\ItemUUID;
use Apisearch\Model\Item;

$itemUUID = new ItemUUID('4303ui203', 'product');
$item = Item::create(
    $itemUUID,
    [
        'name' => 'T-shirt blue and red',
        'description' => 'This is an amazing T-shirt',
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
        'old_price' => 15,
        'brand' => 'Supershirts',
    ],
    [
        'name' => 'T-shirt blue and red',
        'description' => 'This is an amazing T-shirt',
        'brand' => 'Supershirts',
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

#### ** Javascript **
```javascript
import {ItemUUID, Item} from "apisearch";

const itemUUID = new ItemUUID('4303ui203', 'product');
const item = Item.create(
    itemUUID,
    {
        'name': 'T-shirt blue and red',
        'description': 'This is an amazing T-shirt',
        'ean': 7827298738293
    }, 
    {
        'sizes': [
            'M',
            'L',
            'XL',
        ],
        'colors': [
            'Blue',
            'Red',
        ],
        'price': 10,
        'old_price': 15,
        'brand': 'Supershirts'
    },
    {
        'name': 'T-shirt blue and red',
        'description': 'This is an amazing T-shirt',
        'brand': 'Supershirts',
    },
    [
        '4303ui203',
        '7827298738293'
    ],
    [
        'T-shirt'
    ]
);
```
<!-- tabs:end -->

This Item would map exactly as shown in the first example.

### Coordinate

A simple Coordinate is composed by a latitude and a longitude values. That
simple. Both values are float formatted.

<!-- tabs:start -->

#### ** PHP **
```php
use Apisearch\Model\Coordinate;

$itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
```

#### ** Javascript **
```javascript
import {Coordinate} from "apisearch";

const itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
```
<!-- tabs:end -->

### Located Item

If you want to create a located Item, then you can use the static construct
method `createLocated`. Because a located item must have a location, otherwise
this would be a conventional Item, then both an ItemUUID and Coordinate
instances must be passed as parameters.

<!-- tabs:start -->

#### ** PHP **
```php
use Apisearch\Model\ItemUUID;
use Apisearch\Model\Item;
use Apisearch\Model\Coordinate;

$itemUUID = new ItemUUID('4303ui203', 'product');
$itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
$item = Item::createLocated(
    $itemUUID,
    $itemCoordinate
);
```

#### ** Javascript **
```javascript
import {Item, ItemUUID, Coordinate} from "apisearch";

const itemUUID = new ItemUUID('4303ui203', 'product');
const itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
const item = Item.createLocated(
    itemUUID,
    itemCoordinate
);
```
<!-- tabs:end -->

As before, this method allow all other parameters to be defined after the
coordinate.

<!-- tabs:start -->

#### ** PHP **
```php
use Apisearch\Model\ItemUUID;
use Apisearch\Model\Item;
use Apisearch\Model\Coordinate;

$itemUUID = new ItemUUID('4303ui203', 'product');
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

#### ** Javascript **
```javascript
import {Item, ItemUUID, Coordinate} from "apisearch";

const itemUUID = new ItemUUID('4303ui203', 'product');
const itemCoordinate = new Coordinate(
    40.12, 
    -71.34
);
const item = Item.createLocated(
    itemUUID,
    itemCoordinate,
    {}, // Metadata
    {}, // Indexed Metadata
    {}, // Searchable Metadata
    [], // Exact Matching Metadata
    []  // Suggest elements
);
```
<!-- tabs:end -->

### Item manipulation

After the creation of an Item instance, or even after its retrieval from the
repository, you can manage all metadata (single metadata and indexed metadata)
values by using the specific getters and setters.

<!-- tabs:start -->

#### ** PHP **
```php
$metadata = $item->getMetadata();
$metadata['something'] = 'value';
$item->setMetadata($metadata);
$item->addMetadata('another_thing', 'another_value');
```

#### ** Javascript **
```javascript
const metadata = item.getMetadata();
metadata['something'] = 'value';
item.setMetadata(metadata);
item.addMetadata('another_thing', 'another_value');
```
<!-- tabs:end -->

In order to provide an object as much resistant as possible in front of changes,
you can consider all metadata data sets as a unique data set, even if internally
you have divided it in two different arrays. For example, if you have a field
called *price* and at the beginning of your project definition this value is not
going to be indexed, then you should store it inside metadata. Then, in your 
project, if you will access to this value by using the `getMetadata` getter, and
accessing to the desired position.

<!-- tabs:start -->
#### ** PHP **
```php
$item->getMetadata()['price'];
```

#### ** Javascript **
```javascript
item.getMetadata()['price'];
```
<!-- tabs:end -->

But what happens if your price needs to be indexed? Then you should change your
indexing point, and instead of placing the element as a simple metadata, you
should place it as an indexed metadata. So, what happens with all the code
points where you've been requiring the price value? You should change it
well, right?

This last example will not work anymore. Instead of that, you'll need to start
using this new method.

<!-- tabs:start -->
#### ** PHP **
```php
$item->getIndexedMetadata()['price'];
```

#### ** Javascript **
```javascript
item.getIndexedMetadata()['price'];
```
<!-- tabs:end -->

Well, this would be something that may cause you too many code changes, where
should be something insignificant.

In order to avoid this, you should take some decisions in your model.

* Don't repeat keys inside your metadata and indexed_metadata arrays.
* When you request a metadata value, use the `->get($fieldName)` method. This
will return the metadata value accessing all metadata packages at the same time.

In this example, price will be retrieved both from metadata and
indexed_metadata, so even if you change price from one to the other, nothing bad
will happen :)

<!-- tabs:start -->
#### ** PHP **
```php
$item->get('price');
```

#### ** Javascript **
```javascript
item.get('price');
```
<!-- tabs:end -->


### Location Ranges

When talking about located items, and when retrieving and filtering them, we
need to know so well a small part of our model called Location Ranges. They are
related with the Coordinate class, and specifies an area containing many of
them.

There are three type of area definitions.

#### A center point and a distance

Given a center point, defined as a Coordinate instance, and a distance, defined
as an integer and a distance unit (km or mi) joined in a string, you can define
a simple filtering range. You must use an object called `CoordinateAndDistance`.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Geo\CoordinateAndDistance;
use Apisearch\Model\Coordinate;

$locationRange = new CoordinateAndDistance(
    new Coordinate(40.9, -70.0),
    '50km'
);
```

#### ** Javascript **
```javascript
import {CoordinateAndDistance, Coordinate} from "apisearch";

const locationRange = new CoordinateAndDistance(
    new Coordinate(40.9, -70.0),
    '50km'
);
```
<!-- tabs:end -->

> This is useful when using, for example, a website with active localization.
> The browser can request the localization and send the coordinates to us, so we
> can provide a better experience to the final user

#### Two square sides

If you have the top-left coordinate and the bottom-right coordinate of a square,
inside of where you want to locate all the items, you can use this filter
type. In that case, you need both Coordinate instances.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Geo\Square;
use Apisearch\Model\Coordinate;

$locationRange = new Square(
    new Coordinate(40.9, -70.0),
    new Coordinate(39.4, -69.1),
);
```

#### ** Javascript **
```javascript
import {Square, Coordinate} from "apisearch";

const locationRange = new Square(
    new Coordinate(40.9, -70.0),
    new Coordinate(39.4, -69.1),
);
```
<!-- tabs:end -->

> This is useful when working with maps. Maps are usually presented in a square
> visualization mode, so when the final user scrolls, having these two
> coordinates (top-left, bottom-right) we can look the items we want to show

#### A finite set of coordinates (polygon)

You can build your own polygon having a set of coordinates. These coordinates
will draw a polygon, and all items inside the are of this polygon will be
considered as valid result.

All coordinates must be Coordinate instances.

<!-- tabs:start -->
#### ** PHP **
```php
use Apisearch\Geo\Polygon;
use Apisearch\Model\Coordinate;

$locationRange = new Polygon([
    new Coordinate(40.9, -70.0),
    new Coordinate(40.9, -69.1),
    new Coordinate(39.4, -69.1),
    //...
]);
```

#### ** Javascript **
```javascript
import {Polygon, Coordinate} from "apisearch";

const locationRange = new Polygon([
    new Coordinate(40.9, -70.0),
    new Coordinate(40.9, -69.1),
    new Coordinate(39.4, -69.1),
]);
```
<!-- tabs:end -->

You can add as many coordinates as you need in order to build the desired area.

> This is useful when the final user has any kind of drawing tool, so an
> specific polygon can be defined by any user. Useful as well when composing
> maps, for example, defining country areas as polygons.

### Item score

When an Item is retrieved with a Query Result, you can find the score assigned
to the item in this specific query. This value could change across different
queries.

<!-- tabs:start -->
#### ** PHP **
```php
$item->getScore();
```

#### ** Javascript **
```javascript
item.getScore();
```
<!-- tabs:end -->