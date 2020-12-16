# Client Reference

In this chapter we will explain how different clients work. All clients are
supposed to work as a middle between a language and the final API format, so all
clients should work the same way with the same features.

Some clients can be divided in different repositories, and some of them can be
unified everything in one. That information will be told in each case.

## App Repository

The app repository is going to allow you to manipulate apps, indices and tokens
in a very simple and intuitive way.

All repository implementations, before being used, need your API secret in order
to make sure you're using the right repository.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = //
$repository->setCredentials(
    RepositoryReference::create(
        AppUUID::createById('app-1')
    ),
    TokenUUID::createById('token-1230')
);
```

#### ** Javascript **
```javascript
@TODO
```
<!-- tabs:end -->

Let's take a look at all our repository interfaces


### HttpAppRepository

This is the main implementation of this repository, ready for production
purposes and defined for pointing to our main servers.

In order to make it work, you'll need a HTTPClient implementation. In that case,
and because your usage will be maily for production, you can use the
TCPClient implementation.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new HttpAppRepository(
    new TCPClient(
        'http://api.ourhost.xyz:1234',
        new CurlAdapter(),
        '1',
        new RetryMap()
    )
);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### InMemoryAppRepository

Only for development and testing purposes. Not all endpoints are available, and
not all features can be done by using a simple in-memory array, so you'll be
able to index, delete, reset and perform basic queries (remember, in memory,
this means that between requests, this won't work at all).

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\App\InMemoryAppRepository();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### DiskAppRepository

Only for development and testing purposes.
Same than InMemoryRepository, but in this case, each time the repository is
modified, the results are saved into disk. Useful for apisearch server instances
that, willing to work with the data stored in memory, are volatile. After
reloading, data will still be there.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\App\DiskAppRepository('/tmp/my-file.data');
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### MockAppRepository

Empty repository. Nothing is done here.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\App\MockAppRepository();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

So what can I do with any of these implementations?

### Get Tokens
### Add Token
### Delete Token
### Delete Tokens

### Get Indices
### Create Index
### Reset Index
### Check Index
### Configure Index
### Delete Index




## Repository

OK, so now we know how to manage all our model objects. How they interact
between them and how we should integrate them with our code.

But how it really works? We need an interface where we can communicate with an
existing endpoint, so we can really have nice results given a set of pre-indexed
data.

All repository implementations, before being used, need your credentials in 
order to make sure you're using a well configured repository.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = //
$repository->setCredentials(
    RepositoryReference::create(
        AppUUID::createById('app-1'),
        IndexUUID::createById('index-1')
    ),
    TokenUUID::createById('token-1230')
);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

Let's take a look at all our repository interfaces

### HttpRepository

This is the main implementation of this repository, ready for production
purposes and defined for pointing to our main servers.

In order to make it work, you'll need a HTTPClient implementation. In that case,
and because your usage will be maily for production, you can use the
TCPClient implementation.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new HttpRepository(
    new TCPClient(
        'http://api.ourhost.xyz:1234',
        new CurlAdapter(),
        '1',
        new RetryMap()
    )
);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### TransformableRepository

This is a small wrapper of the simple HttpRepository, ready to understand and
interact with your own Domain, instead of working with Items.

Before understanding how this adapter work, we should understand what a
transformer is and how can be really useful when integrating our project with
ApiSearch.

Imagine we have a domain class called Product. Because this class is part of our
domain, we should never change its composition because of external changes,
right? So imagine that we want to start using ApiSearch. As reading this
documentation we can see that ApiSearch understands about Items, and only about
them, so you could think...

`Oups, I should change my product and only work with Items`

That would be a very very bad decision, so remember that with or without
ApiSearch, your product will continue being a Product.

Said that, and if you check all available Repository methods, you'll notice that
you can only use Item related methods (addItem, deleteItem...), so does it mean
that do I need to work always with items? Not at all.

We must find a way where there is a silent transformation between our model
(Product) and the ApiSearch model (Item, ItemUUID), and this way is called
Transformers.

So what is a Transformer? Easy. A class that can convert any of your model
objects into an Item, by implementing the interface WriteTransformer, and vice
versa, by implementing the interface ReadTransformer. All Repositories must
implement WriteTransformer, so it has not sense at all to have a transformer
that does'nt write, but implementing ReadTransformer is optional.

The difference between both strategies is that by implementing ReadTransformer,
you will receive your own model objects when making queries. Otherwise, when
reading from the repository, you will receive only Item instances.

Let's check a Transformer example

<!-- tabs:start -->
#### ** PHP **
```php
class ProductTransformer implements ReadTransformer, WriteTransformer
{
    /**
     * Is an indexable object.
     *
     * @param mixed $object
     *
     * @return bool
     */
    public function isValidObject($object): bool
    {
        return $object instanceof Product;
    }

    /**
     * Create item by object.
     *
     * @param mixed $object
     *
     * @return Item
     */
    public function toItem($object): Item
    {
        return Item::create(
            $this->toItemUUID($object),
            [
                // Metadata 
                'name' => $object->getName(),
                'description' => $object->getDescription(),
                'ean' => $object->getEan(),
            ],
            [
                // Indexed metadata
                'price' => $object->getPrice(),
                'old_price' => $object->getOldPrice(),
                'brand' => $object->getBrand()->getName(),
                'created_at' => $object->getCreatedAt(),
                'sizes' => array_values($object->getSizes()),
                'colors' => array_values($object->getColors()),
            ],
            [
                // Searchable metadata
                'name' => $object->getName(),
                'description' => $object->getDescription(),
                'brand' => $object->getBrand()->getName(),
            ],
            [
                // Exact matching metadata
                $object->getId(),
                $object->getEan(),
            ],
            [
                // Suggestions
                'T-shirt',
            ]
        );
    }

    /**
     * Create item UUID by object.
     *
     * @param mixed $object
     *
     * @return ItemUUID
     */
    public function toItemUUID($object): ItemUUID
    {
        return new ItemUUID(
            $object->getId(),
            'product'
        );
    }
    
    /**
     * The item should be converted by this transformer.
     *
     * @param Item $item
     *
     * @return bool
     */
    public function isValidItem(Item $item): bool
    {
        return $item->getType() === 'product';
    }

    /**
     * Create object by item.
     *
     * @param Item $item
     *
     * @return mixed
     */
    public function fromItem(Item $item)
    {
        return new Product(
            $item->getId(),
            $item->get('name'),
            $item->get('description'),
            // ...
    }
}
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

Ok, we have our transformer ready. Then what? Let's see how we can build a 
TransformableRepository instance.

> Please, check Symfony integration. This is only a small snippet to show how
> this class is internally built. The Bundle build all these instances by using
> the dependency injection component.

<!-- tabs:start -->
#### ** PHP **
```php
$productTransformer = new ProductTransformer();
$transformer = new Transformer($eventDispatcher);
$transformer->addReadTransformer($productTransformer);
$transformer->addWriteTransformer($productTransformer);
$transformableRepository = new TransformableRepository(
    $httpRepository,
    $transformer 
);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

And that's it.
Discovering a little bit the TransformableRepository we will see that, apart
of having the natural Item related methods, we will have same methods but with
Object instead of Item

- ->addObject()
- ->deleteObject()

And when querying the repository, if your class specific transformer implements
ReadTransformer, instead of having an Item instance, you'll have a
transformation.

> Using Read transformation or not should be a project scope decision, so having
> only a few Transformers implementing ReadTransformer interface is not a good
> thing.

### InMemoryRepository

Only for development and testing purposes. Not all endpoints are available, and
not all features can be done by using a simple in-memory array, so you'll be
able to index, delete, reset and perform basic queries (remember, in memory,
this means that between requests, this won't work at all).

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\Repository\InMemoryRepository();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### DiskRepository

Only for development and testing purposes.
Same than InMemoryRepository, but in this case, each time the repository is
modified, the results are saved into disk. Useful for apisearch server instances
that, willing to work with the data stored in memory, are volatile. After
reloading, data will still be there.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\Repository\DiskRepository('/tmp/my-file.data');
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### MockRepository

Empty repository. Nothing is done here.

<!-- tabs:start -->
#### ** PHP **
```php
$repository = new \Apisearch\Repository\MockRepository();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

So what can I do with any of these implementations?

### Reset

Do you want to reset your entire index? That easy. One single call and all your
read-only data will be completely erased.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->reset();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

When a repository is reset, internally this is deleted and created again. An
index can be created by using a specific language. When this language is
defined, then some internal improvements are performed in order to provide
better experience on search time.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->reset('en');
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### Index

This repository endpoint aims to let you add your entities in the database. Of 
course, to understand how easy is to do that, first of all you need to 
understand how the model is modeled (the first chapter of this documentation is
about that).

<!-- tabs:start -->
#### ** PHP **
```php
$repository->addItem(Item $item);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

If you use TransformableRepository, you can use as well the Object related
method.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->addObject(Object $object);
$repository->addObject($product);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

This method only prepares this new item to be added/modified, but does'nt
change it actually

### Delete

Deletes an existing element from your repository. In order to use this endpoint,
you need to work with Item references.

<!-- tabs:start -->
#### ** PHP **
```php
$itemUUID = new ItemUUID('10', 'product');
$repository->deleteItem($itemUUID);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

If you use TransformableRepository, you can use as well the Object related
method.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->deleteObject(Object $object);
$repository->deleteObject($product);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

This method only prepares this new item to be deleted, but does'nt change it
actually

### Flush

Perform real changes by having a stack of additions and deletions.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->flush();
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

You can batch items when connecting to the repository in order to minimize the
number of connections and the size of these. In next example, every connection
will contain 100 elements maximum. By default this value is set to 500.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->flush(100);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

If we want to only flush if and only if we have a minimum of 100 elements, then
we can use the second parameter by setting it to true.

<!-- tabs:start -->
#### ** PHP **
```php
$repository->flush(100, true);
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

### Query

This endpoint will be a very important part of your integration, so allow you
to, given a Query instance, get a Result instance.

<!-- tabs:start -->
#### ** PHP **
```php
$result = $repository->query(Query $query) : Result
```

#### ** Javascript **
```javascript
@TODO
````
<!-- tabs:end -->

That's it. The result of the query method is a Result instance. To know a little
bit more about this object, check the documentation chapter.









