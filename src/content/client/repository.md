---
page: 5
title: Repository
description: Apisearch client - Repository object
category: Client
template: one-column.mustache
source: client/repository.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch model
---

# Repository

OK, so now we know how to manage all our model objects. How they interact
between them and how we should integrate them with our code.

But how it really works? We need an interface where we can communicate with an
existing endpoint, so we can really have nice results given a set of pre-indexed
data.

Let's check the interface `Apisearch\Repository\Repository`

Using an implementation of this main repository, you'll be able to index,
delete, reset and query your main data set. Each interaction will create an 
internal event, each one named in a particular way. To query over these events,
please check the [EventRepository](#event-repository) chapter.

All repository implementations, before being used, need your API secret in order
to make sure you're using the right repository.

Let's take a look at all our repository interfaces

## HttpRepository {#http-repository}

This is the main implementation of this repository, ready for production
purposes and defined for pointing to our main servers.

In order to make it work, you'll need a HTTPClient implementation. In that case,
and because your usage will be maily for production, you can use the
GuzzleClient implementation.

```php
$repository = new HttpRepository(
    new GuzzleClient('http://api.ourhost.xyz:1234')
);
$repository->setKey('mysecretkey');
```

## TransformableRepository {#transformable-repository}

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
                'name' => $this->getName(),
                'description' => $this->getDescription(),
                'brand' => $this->getBrand()->getName(),
            ],
            [
                // Exact matching metadata
                $this->getId(),
                $this->getEan(),
            ],
            [
                // Suggestions
                'T-shirt',
            ]
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
            $item->get('description),
            // ...
    }
}
```

Ok, we have our transformer ready. Then what? Let's see how we can build a 
TransformableRepository instance.

> Please, check Symfony integration. This is only a small snippet to show how
> this class is internally built. The Bundle build all these instances by using
> the dependency injection component.

```php
$productTransformer = new ProductTransformer();
$transformer = new Transformer($eventDispatcher);
$transformer->addReadTransformer($productTransformer);
$transformer->addWriteTransformer($productTransformer);
$transformableRepository = new TransformableRepository(
    $httpRepository,
    $transformer 
);
$transformableRepository->setKey('mysecretkey');
```

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

## InMemoryRepository {#in-memory-repository}

Only for development and testing purposes. Not all endpoints are available, and
not all features can be done by using a simple in-memory array, so you'll be
able to index, delete, reset and perform basic queries (remember, in memory,
this means that between requests, this won't work at all).

```php
$repository = new InMemoryRepository();
$repository->setKey('mysecretkey');
```

So what can I do with any of these implementations?

## Reset

Do you want to reset your entire index? That easy. One single call and all your
read-only data will be completely erased.

```php
$repository->reset();
```

When a repository is reset, internally this is deleted and created again. An
index can be created by using a specific language. When this language is
defined, then some internal improvements are performed in order to provide
better experience on search time.

```php
$repository->reset('en');
```

## Index

This repository endpoint aims to let you add your entities in the database. Of 
course, to understand how easy is to do that, first of all you need to 
understand how the model is modeled (the first chapter of this documentation is
about that).

```php
$repository->addItem(Item $item);
```

If you use TransformableRepository, you can use as well the Object related
method.

```php
$repository->addObject(Object $object);
$repository->addObject($product);
```

This method only prepares this new item to be added/modified, but does'nt
change it actually

## Delete

Deletes an existing element from your repository. In order to use this endpoint,
you need to work with Item references.

```php
$itemUUID = new ItemUUID('10', 'product');
$repository->deleteItem($itemUUID);
```

If you use TransformableRepository, you can use as well the Object related
method.

```php
$repository->deleteObject(Object $object);
$repository->deleteObject($product);
```

This method only prepares this new item to be deleted, but does'nt change it
actually

## Flush

Perform real changes by having a stack of additions and deletions.

```php
$repository->flush();
```

You can batch items when connecting to the repository in order to minimize the
number of connections and the size of these. In next example, every connection
will contain 100 elements maximum. By default this value is set to 500.

```php
$repository->flush(100);
```

If we want to only flush if and only if we have a minimum of 100 elements, then
we can use the second parameter by setting it to true.

```php
$repository->flush(100, true);
```

## Query {#query-repository}

This endpoint will be a very important part of your integration, so allow you
to, given a Query instance, get a Result instance.

```php
$result = $repository->query(Query $query) : Result
```

That's it. The result of the query method is a Result instance. To know a little
bit more about this object, check the documentation chapter.