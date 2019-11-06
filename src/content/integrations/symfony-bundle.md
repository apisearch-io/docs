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
- [App Repository](#app-repository)
- [App Repository](#user-repository)
- [Transformers](#transformers)
- [Twig macros](#twig-macros)
- [Filter values](#filter-values)
- [Reset index command](#reset-index-command)

## Install

In order to install the Apisearch bundle you need to follow the regular Bundle
installation process described in the [Symfony documentation](https://symfony.com/doc/3.3/bundles/installation.html).

## Configuration

This bundle provides a single point of configuration where you can define how
your index should be built. That means defining the repositories by their own
app_id values, and inside each one, defining the token that should be used in 
order to connect properly and the different indices available.

Given this configuration, you'll be able to manage all apps, indices, tokens and
repositories content.

Let's check a basic configuration snippet.

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

We have 2 different applications here, with their own indices each. Each one of
them will be used to generate repositories for you. Let's check what
repositories are available with this configuration.

## App Repository

This is the repository that will allow you to manage applications, their indices
and tokens. Remember that you must have valid tokens for such actions.

With this configuration the bundle will generate for you two on-demand instances
implementing `AppRepository`. These instances will be injectable by using their
built service names, following the pattern
`apisearch.repository_{app_name}`

```yaml
my_service:
    class: My\Service\Namespace
    arguments:
      - "@apisearch.repository_search"
```

> The name of the repository is the one defined in the configuration block. In
> this case, you have two applications, the search and the comments one. You
> would find here the service `apisearch.search_repository` and
> `apisearch.commends_repository`. The app_id is not used at any case.

You can use **auto-wiring** as well by using named aliases. This mean that if you
have this feature enabled (by default in Symfony 4), you can simply inject the
AppRepository by casting it as it is, and by naming the parameter following this
convention

```php
public function __construct(AppRepository $apisearchSearchAppRepository) {}
public function __construct(AppRepository $apisearchCommentsAppRepository) {}
```

## Repository

Each application will create a single repository per each index created. Each
one of them will give you the capability to connect to the Apisearch server and
manage the entities inside this index.

Following the same default configuration, this bundle will create 4 different
repositories, each one following the pattern
`apisearch.repository_{app_name}.{index_name}`

- apisearch.repository_search.default
- apisearch.repository_comments.ca
- apisearch.repository_comments.es
- apisearch.repository_comments.en

The first repository will use the token assigned to search repository, and the
other 3, will use the second token.
You can use all these service by injecting them in your service or containers.

```yaml
my_service:
    class: My\Service\Namespace
    arguments:
        - "@apisearch.repository_search.default"
```

> The name of the repository and the name of the index are the ones defined in
> the configuration block. In this case, inside the first application you will
> find a single repository generated named
> `apisearch.repository_search.default`. The app_id and the index_id will not be
> used at any case.

You can use **auto-wiring** as well by using named aliases. This mean that if you
have this feature enabled (by default in Symfony 4), you can simply inject the
Repository by casting it as it is, and by naming the parameter following this
convention

```php
public function __construct(Repository $apisearchSearchDefaultRepository) {}
public function __construct(TransformableRepository $apisearchCommentsEsRepository) {}
```

Both castings will have the same effect.

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

### Indexing entities

By using the TransformableRepository, you will be able to work with yet another
2 extra methods.

- addObject
- deleteObject

Both methods will use Transformers to work with your model, but call API
endpoints with the only entity we really understand in our servers. Item.

## Commands

This bundle allow you the same bundles than 