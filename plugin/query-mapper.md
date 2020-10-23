# Query Mapper plugin

This plugin is a hands-on plugin. This means that in order to work with it, we
recommend you to fork the main repository, and work with your own repository, so
you will have to add some code in the server

Apisearch is a search engine that exposes a basic object mapping, like what is a
Query, what is a Response and what Items are composed by. This is one of the
purposes of the project, so forces your entire environment to work with an
specific standard. That is always good, so there's in agreement that can fulfill
all your company parts.

You can find an scenario where some of your company pieces don't want to build
queries in their logic.

> We want a single point where to ask single questions and give us single
> answers. We don't want logic changes to affect our product releases, and we
> think that logic should always be placed in one single point.

That can happen, and single logic queries can easily be solved with static
tokens, adding default queries. But complex query builds, like conditionals
depending on the query parameters, should be placed then inside the engine.

You can always create a middleware where to place this logic, but this plugin
allow us to solve it directly in our repository.

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="query_mapper"
```

## Adding a query mapper

So, a query mapper is a class where you will map an **app_id**, a **index_id**,
a **token** and a Query instance in a single external token. For example, we
want to serve a set of 10 items, previously filtered by a complex algorithm, and
we want to provide a single token to our final client. This class would map this
new token to all the info needed to make this query.

> As you can see, this plugin could help to protect the credentials, only
> exposing one single token

> As we said, this plugin is hands on, and will need some PHP code.

To create a new query mapping we have to create a new QueryMapper instance by
creating a new PHP Class, implementing 
`Apisearch\Plugin\QueryMapper\Domain\QueryMapping`. Let's check an example.

```php
<?php

/*
 * This file is part of the Apisearch Server
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Feel free to edit as you please, and have fun.
 *
 * @author Marc Morera <yuhu@mmoreram.com>
 */

declare(strict_types=1);

namespace Apisearch\Server\Custom\QueryMapper;

use Apisearch\Model\AppUUID;
use Apisearch\Model\IndexUUID;
use Apisearch\Model\ItemUUID;
use Apisearch\Plugin\QueryMapper\Domain\QueryMapper;
use Apisearch\Query\Query;
use Apisearch\Repository\RepositoryReference;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class MyQueryMapper.
 */
class MyQueryMapper implements QueryMapper
{
    /**
     * Get mapping tokens.
     *
     * @return string[]
     */
    public function getMappingTokens(): array
    {
        return ['my-super-token'];
    }

    /**
     * Get mapped credentials.
     *
     * @return RepositoryReference
     */
    public function getRepositoryReference(): RepositoryReference
    {
        return RepositoryReference::create(
            AppUUID::createById('app-1'),
            IndexUUID::createById('index-1')
        );
    }

    /**
     * Get token.
     *
     * @return string
     */
    public function getToken(): string
    {
        return 'token-1';
    }

    /**
     * Build query.
     *
     * @param Request $request
     *
     * @return Query
     */
    public function buildQueryByRequest(Request $request): Query
    {
        return Query::createByUUIDs([
            ItemUUID::createByComposedUUID($request->query->get('id')),
        ]);
    }
}
```

As you can see, this class will expose token `my-super-token` as a valid token, 
mapping it internally with app-1, index-1 and token-1. Furthermore, using this
new token, you will be querying the Item with an ID from the request.

To make it simpler, both curl queries will be equivalent.

```bash
curl -XGET "http://localhost:8200/v1?app_id=app-1&index=index-1&token=token=1" -d'{
    "query": {
        "filters": {
            "id": {
                "filter_type": "field",
                "field": "_id",
                "values": [
                    "10"
                ]
            }
        }
    }
}'
```

```bash
curl -XGET "http://localhost:8200/v1?token=my-super-token&id=10"
```

Once the class is placed in a folder, we have to tell Apisearch that we have a
new QueryMapper by adding the namespace in the configuration.

```yml
apisearch_plugin_query_mapper:
    query_mappers:
        - Apisearch\Server\Custom\QueryMapper\MyQueryMapper
```

## Adding a Result Mapper

By default, when you make a query on Apisearch, you get a Result object,
containing some interesting information about the search, like the number of
hits your query had, and an array of Item instances.

You may want to change, given a set of tokens, the format of the response, for
example, for specific external partners.

> We don't recommend this feature, although we know that people will have,
> sooner than later, this need. This is why we propose a clean way of doing
> that.

```php
<?php

/*
 * This file is part of the Apisearch Server
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Feel free to edit as you please, and have fun.
 *
 * @author Marc Morera <yuhu@mmoreram.com>
 */

declare(strict_types=1);

namespace Apisearch\Server\Custom\ResultMapper;

use Apisearch\Model\Item;
use Apisearch\Plugin\QueryMapper\Domain\ResultMapper;
use Apisearch\Result\Result;

/**
 * Class MyResultMapper.
 */
class MyResultMapper implements ResultMapper
{
    /**
     * Get tokens.
     *
     * @return string[]
     */
    public function getTokens(): array
    {
        return ['my-token'];
    }

    /**
     * Build array.
     *
     * @param Result $result
     *
     * @return array
     */
    public function buildArrayFromResult(Result $result): array
    {
        return [
            'item_nb' => count($result->getItems()),
            'item_ids' => array_map(function (Item $item) {
                return $item->composeUUID();
            }, $result->getItems()),
        ];
    }
}
```

In this case, each time a query uses the token `my-token`, we will apply a
transformation of the Result instance, providing only the number of items
returned, and the uuids of the returned items.

Once the class is placed in a folder, we have to tell Apisearch that we have a
new QueryMapper by adding the namespace in the configuration.

```yml
apisearch_plugin_query_mapper:
    result_mappers:
        - Apisearch\Server\Custom\ResultMapper\MyResultMapper
```