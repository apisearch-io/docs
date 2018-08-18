---
page: 1
icon: angle-right
title: Symfony Bundle
description: Apisearch integrations - Symfony Apisearch Bundle
category: Integrations
template: one-column-with-toc.mustache
source: integrations/symfony-bundle.md
languages:
  - yml
tags:
  - apisearch-client
  - apisearch integration
  - symfony
  - bundle
---

# Symfony Bundle

This library aims to provide to any Symfony >=3.0 developer a nice configuration
way to create, configure and inject Apisearch php repositories. Check the 
[PHP library documentation](http://github.com/puntmig/php-search) for plain PHP
documentation.

- [Install](#install)
- [Repository](#repository)
- [Event Repository](#event-repository)
- [Transformers](#transformers)
- [Twig macros](#twig-macros)
- [Filter values](#filter-values)
- [Reset index command](#reset-index-command)

## Install



## Repository

In this chapter we will see how to create a new repository instance in order to
create a nice connection with the remote server. This repository will be always
created by the Symfony container, so we only have to define some parameters to
make it happen.

Let's open the configuration file.

```yml
apisearch:
    repositories:
        search:
            app_id: d78s7ds89
            token: dcdbc971-9872-a798-c7ac-59e64957d4bd
            indices:
                default: d789d7s89
        comments:
            app_id: ds9d7s8978
            token: 1d992ee9-0eb4-096c-3e1e-bc1eba256360
            indices:
                ca: 87dsd78s78
                es: d7s8d78s97
                en: 347893b43b
```

By default, this configuration creates a TransformableRepository instance,
wrapping a HttpRepository instance configured by given endpoint and api secret.

The bundle will generate one repository per index, and will always follow the
same pattern `apisearch.repository_{app_name}.{index_name}`. In the example
posted, the container would generate 4 different connection repositories

- apisearch.repository_search.default
- apisearch.repository_comments.ca
- apisearch.repository_comments.es
- apisearch.repository_comments.en

The first repository will use the token assigned to search repository, and the
other 3, will use the second token.
You can use all these service by injecting them in your service or containers.

```yml
services:

    my_service:
        class: My\Service\Namespace
        arguments:
            - "@apisearch.repository_search.default"
```

You can disable HTTP clients if you're not going to work with the HTTP layer.
That will be great if you are under testing environment. In that case, you will
be able to work with a very restrictive environment. That means that complex
queries cannot be tested.

```yml
apisearch:
    repositories:
        search:
            app_id: d78s7ds89
            token: dcdbc971-9872-a798-c7ac-59e64957d4bd
            indices:
                default: d789d7s89
            http: false
```

From now, this documentation will talk about using HTTP layer.
You can create a test client by telling through configuration. If the repository
is created with a test environment, then a special HttpClient will be created to
work with the testing client provided by Symfony client. Of course, in that
case, we don't need any endpoint.

```yml
apisearch:
    repositories:
        search_test:
            app_id: d78s7ds89
            token: dcdbc971-9872-a798-c7ac-59e64957d4bd
            indices:
                default: d789d7s89
            test: true
```

You can use as well another Repository implementation. Yours for example. This
service must be defined in the container, and you should define the service name
without the `@` symbol.

```yml
apisearch:
    repositories:
        search:
            app_id: d78s7ds89
            token: dcdbc971-9872-a798-c7ac-59e64957d4bd
            indices:
                default: d789d7s89
            search:
                repository_server: my_repository_service
```

## Event Repository

You can use the event repository as well. The container will build exactly the
same number of services than the regular repository, but instead of
`.repository_`, the services are built by using the `.event_repository_` syntax.

- `apisearch.event_repository_search.default`
- `apisearch.event_repository_comments.ca`
- `apisearch.event_repository_comments.es`
- `apisearch.event_repository_comments.en`

You can inject them as well the way Symfony says.


```yml
services:

    my_service:
        class: My\Service\Namespace
        arguments:
            - "@apisearch.event_repository_search"
```

You can use as well another Event Repository implementation. Yours for example.
This service must be defined in the container, and you should define the service
name without the `@` symbol.

```yml
search_bundle:
    repositories:
        search:
            app_id: d78s7ds89
            token: dcdbc971-9872-a798-c7ac-59e64957d4bd
            indices:
                default: d789d7s89
            event:
                repository_server: my_event_repository_service
```

## Transformers

How your entities are mapped as an Item?

That may be a simple question with a simple answer, but in fact, that will be
your maximum *pain* when integrating with Apisearch. And working with
Transformers is so easy and intuitive, so nothing to worry about.

- Will you write items?

If you do, then it makes sense to write a WriteTransformer implementation for
each model type. For example. In your project you work with Products, and you
want to index them all. But what is your product composed by? Do you have a name
or a description? Are they going to be searchable by these values? Maybe a SKU?

Well, by implementing a WriteTransformer, you receive your entity instance, and
you must be capable to receive, on one hand an Item instance, and on the other
hand an ItemUUID instance as well. That simple.

- Will you read items?

That question can have several answers.

The first one is that you will read them, but you need to work, always, using
a Product instance. That makes sense if your Product is completely dumped in the
Apisearch servers, and by receiving a simple Item instance, you can really
create this Product instance.

When this scenario is not possible at all? Well, when you work with read model
and write model at the same time. If you want to work with Doctrine entities
when printing results because you want to iterate over her dependencies, then
maybe you should reconsider how to change that.

When the scenario is possible, and your Product object is part of your read
model, then we have a solution for you. Then your WriteTransformer
implementation could implement, at the same time, ReadTransformer.

In that case, you receive an Item instance and you should be able to return an
instance of your read model. A simple Product value object (remember, not the
doctrine one, not an entity retrieved by the entity manager).

### Register your transformers

You can actually register some Transformers in order to be able to use the
TransformableRepository. If you don't have any, don't worry, this Repository
class allows you as well to work with native Item methods.

Let's work with the ProductTransformer, so when we index or delete any object by
using the advanced model-agnostic methods, the Transformer is enabled and used.
As you will see, creating a transformer is too simple to make this part of the
documentation much longer.

```yml
services:

    product_transformer:
        class: App\Transformer\ProductTransformer
        tags:
            - { name: apisearch.write_transformer }
            - { name: apisearch.read_transformer }
```

That's it. The first one to subscribe this transformer as a WriteTransformer and
the second one to subscriber it as a ReadTransformer. Remember to implement both
interfaces if needed.

### Saving entities

By using the TransformableRepository, you will be able to work with yet another
2 extra methods.

- addObject
- deleteObject

Both methods will use Transformers to work with your model, but call API
endpoints with the only entity we really understand in our servers. Item.

## Twig macros

This package provides you as well a set of basic macros for your aggregations.
Let's imagine that our controller makes a great Query with 2 aggregations and
gets from the repository a Result object. We have aggregated our repository by
color and by size.

```php
/**
 * Our controller
 */
class SearchController extends Controller
{
    /**
     * Search action
     *
     * @return Response
     */
    public function searchAction() : Response
    {
        $query = Query::createMatchAll()
            ->aggregateBy('size', 'size', Filter::AT_LEAST_ONE)
            ->aggregateBy('color', 'color', Filter::AT_LEAST_ONE)
            
        $result = $this
            ->get('apisearch.repository_search')
            ->query($query);
            
        return $this->render('MyBundle:Search:search.html.twig', [
            'result' => $result,
        ]);
    }
}
```

Then, this Result object is passed to the view, and we want a basic aggregation
print, in order to check that good results are being printed properly.

If you go to the PHP documentation and check how a Result object is actually
built internally, you'll notice that, in fact, any kind of view can be build on
top of that object. You can take this base macros as an example as well.

```jinja
{% import "ApisearchBundle:Macros:aggregations.html.twig" as _aggregations %}

{{ _aggregations.printAggregation(result, 'size') }}
{{ _aggregations.printAggregation(result, 'color') }}
```

That simple macro will print something like that

```
Size
[ ] M   (10)
[ ] L   (12)
[ ] XL  (6)

Color
[ ] Blue (1)
[ ] Red  (2)
```

Each line will create the right url, with parameters applied or removed.

## Filter values

As you can see, any filter is applied in the last example, and this is because,
even if we applied a filter clicking by one of these links, filters are not
retrieved from the request and added in the query.

Let's fix it by changing our controller.

```php
/**
 * Our controller
 */
class SearchController extends Controller
{
    /**
     * Search action
     *
     * @param Request $request
     *
     * @return Response
     */
    public function searchAction(Request $request) : Response
    {
        $requestQuery = $request->query;
        $query = Query::createMatchAll()
            ->filterBy('size', 'size', $requestQuery->get('size', []), Filter::AT_LEAST_ONE)
            ->aggregateBy('size', 'size')
            ->filterBy('color', 'color', $requestQuery->get('color', []), Filter::AT_LEAST_ONE)
            ->aggregateBy('color', 'color')
            
        $result = $this
            ->get('apisearch.repository_search')
            ->query($query);
            
        return $this->render('MyBundle:Search:search.html.twig', [
            'result' => $result,
        ]);
    }
}
```

By default, the filter/aggregation name will be the name of the parameter, so if
you add a HTTP query parameter called color with value an array with value
`blue`, then the Query object will take `blue` filter. Then, your aggregations
will look like this, and all your results will contain, minimum, color blue.

```
Size
[ ] M   (10)
[ ] L   (12)
[ ] XL  (6)

Color
[x] Blue (1)
[ ] Red  (2)
```

## Reset index command

By default this bundle enables to a pre-configured command, so you can reset any
of your configured repositories by only adding as argument the repository name.

```bash
Usage:
  puntmig:search:reset-index <repository> [<language>]

Arguments:
  repository            Repository name
  language              Language base for the repository

Options:
  -h, --help            Display this help message
  -q, --quiet           Do not output any message
  ...
  
Help:
  Reset your search index. Prepared a clean instance of the index and remove 
  existing objects
```

as you can see, you can define as well the language.

```bash
php bin/console puntmig:search:reset-index search
php bin/console puntmig:search:reset-index search ca
```