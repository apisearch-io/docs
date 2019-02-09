---
page: 5
icon: angle-right
title: App Repository
description: Client Reference - App Repository
category: Client Reference
template: one-column-with-toc.mustache
source: client-reference/app-repository.md
languages: 
  - php
  - javascript
tags:
  - app repository
---

# App Repository

The app repository is going to allow you to manipulate apps, indices and tokens
in a very simple and intuitive way.

All repository implementations, before being used, need your API secret in order
to make sure you're using the right repository.

```php
$repository = //
$repository->setCredentials(
    RepositoryReference::create(
        AppUUID::createFromId('app-1')
    ),
    TokenUUID::createFromId('token-1230')
);
```

Let's take a look at all our repository interfaces


## HttpAppRepository

This is the main implementation of this repository, ready for production
purposes and defined for pointing to our main servers.

In order to make it work, you'll need a HTTPClient implementation. In that case,
and because your usage will be maily for production, you can use the
GuzzleClient implementation.

```php
$repository = new HttpAppRepository(
    new GuzzleClient('http://api.ourhost.xyz:1234')
);
```

## InMemoryAppRepository

Only for development and testing purposes. Not all endpoints are available, and
not all features can be done by using a simple in-memory array, so you'll be
able to index, delete, reset and perform basic queries (remember, in memory,
this means that between requests, this won't work at all).

```php
$repository = new InMemoryAppRepository();
```

## DiskAppRepository

Only for development and testing purposes.
Same than InMemoryRepository, but in this case, each time the repository is
modified, the results are saved into disk. Useful for apisearch server instances
that, willing to work with the data stored in memory, are volatile. After
reloading, data will still be there.

```php
$repository = new DiskAppRepository('/tmp/my-file.data');
```

## MockAppRepository

Empty repository. Nothing is done here.

```php
$repository = new MockAppRepository();
```

So what can I do with any of these implementations?

## Get Tokens
## Add Token
## Delete Token
## Delete Tokens

## Get Indices
## Create Index
## Reset Index
## Check Index
## Configure Index
## Delete Index
