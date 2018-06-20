---
root: true
page: 4
icon: chain
title: Plugins
description: Apisearch plugins.
category: Plugins
template: one-column.mustache
source: plugins.md
languages: ~
tags:
  - plugins
---

# Plugins

Do you know how you can make your own Apisearch instance much more amazing that
it is by default? By using Apisearch Plugins you can expand as much as you want
the software by only following some simple instructions.

You will find some base plugins in the main server repository, and some other
official plugins developed by our partners.

## [Metadata Fields](plugins/metadata-fields.html)
Save your read-only fields in a key-value technology instead of storing it
inside your search infrastructure. Populate your items with these values
depending on your needs every moment.
- Source - [Github](https://github.com/apisearch-io/search-server/tree/master/Plugin/MetadataFields)
- Current versions - [0.1.*](https://github.com/apisearch-io/search-server/releases)

## [Callbacks](plugins/callbacks.html)
Make additional callbacks before or after your calls. By doing them before you
will be able to modify the input data, and by doing them after, you will be able
to change the result value.
- Source - [Github](https://github.com/apisearch-io/search-server/tree/master/Plugin/Callbacks)
- Current versions - [0.1.*](https://github.com/apisearch-io/search-server/releases)
    
## Make your own plugin

Apisearch is implemented by doing CQRS. This means that each time anyone uses
Apisearch, a new command is created as a ValueObject. This value should not
be changed by anyone during it's life. This objects is taken by one and only
one handler, and some action is taken by this handler.

For example.

You make a query. Inside the controller, the more external layer of the
application, we create a ValueObject called `Query` and we add this object into
an engine called Command Bus. This bus is like a tube, with an start and a
finale. Inside our controller we have the start, and the handler would be the
finale of the tube.

The magic part of this tube is that, between the start and the finale, we have
several (as many as we want) holes, where we can intercept all the Commands that
we want, read them and even change them.

> By default, the CQRS pattern would say that the command should'nt be
> changeable, but by adding this new plugins layer, some commands can be
> replaced by new ValueObjects of the same class.

And there's where Apisearch Plugins take their effect. A plugin can basically
change the behavior of all actions by creating Middlewares. Let's see an example
of a Plugin with one mission. Each time a query is done, we want to add a new
Filter that would allow us to only serve those items inside a group. For
example, very useful for adding an extra layer of security.

## Creating the plugin base

An Apisearch, by default, is a Symfony plugin. You can see some examples of how
these plugins are designed in our default set of Plugins, but let's talk about
a simple bundle architecture

```
plugin/
|
|-- DependencyInjection/
|    |-- CompilerPass/ ..
     |-- MyPluginExtension.php
     |-- MyPluginConfiguration.php
|-- Domain
|    |-- Model/ ..
|    |-- Middleware/
|         |-- QueryMiddleware.php
|         |-- IndexItemsMiddleware.php
|         |-- DeleteItemsMiddleware.php
|    |-- Repository/
|         |-- MyRepository.php
|         |-- MyInMemoryRepository.php
|-- Resources/ ..
|-- Redis/
|    |-- MyRedisRepository.php
|-- MyPluginBundle.php
```

As you can see, anything different than other simple bundles inside the Symfony
environment.

The difference between a simple Bundle and a Apisearch plugin is an interface.
As simple as it sounds.

```php
/**
 * Class CallbacksPluginBundle.
 */
class CallbacksPluginBundle extends BaseBundle implements Plugin
{
    /**
     * Get plugin name.
     *
     * @return string
     */
    public function getPluginName(): string
    {
        return 'callbacks';
    }
}
```

The method that any plugin must implement is the `getPluginName`. It will be
used mainly for enabling desired plugins when using an specific token. For
example, this one we're building now, we could configure some tokens where this
filter will be applied by enabling this plugin. But we could have other regular
tokens with all plugins disabled.

## Enabling the plugin

Of course, we need to enable the plugin. Again, same strategy that is used
inside Symfony environment. Enable the Bundle in our kernel.

```yml
bundles:
    - Apisearch\Server\ApisearchServerBundle
    - Apisearch\Plugin\Callbacks\CallbacksPluginBundle
```

## Adding a Middleware

Let's add some action in our plugin. And to do that, we are going to create a
new middleware called `QueryMiddleware`. We're going to configure the middleware
in order to make some action **ONLY** when a new Query is done and the command
`Query` is passed through the command bus.

```php
/**
 * Class QueryApplySomeFiltersMiddleware.
 */
class QueryApplySomeFiltersMiddleware implements PluginMiddleware
{
    /**
     * Execute middleware.
     *
     * @param CommandWithRepositoryReferenceAndToken $command
     * @param callable                               $next
     *
     * @return mixed
     */
    public function execute(
        CommandWithRepositoryReferenceAndToken $command,
        $next
    ) {
        // Do some action before the Command handler is executed. We would place
        // the filters here
        
        $result = $next($command);

        // Do some action after the Command handler is executed, and before the
        // value is returned to the previous middleware

        return $result;
    }

    /**
     * Events subscribed namespace.
     *
     * @return string[]
     */
    public function getSubscribedEvents(): array
    {
        return [Query::class];
    }
}
```

As you can see, the method `getSubscribedEvents` allow us to work with different
commands in the same class. But remember that different actions related to
different commands should be placed in several middlewares.

After defined our class, we need to create the middleware service and tell 
Apisearch that this is a middleware of a plugin. For such action, let's create a
service definition with a tag.

```yml
services:

    #
    # Middlewares
    #
    apisearch_plugin.my_plugin.query_apply_some_filters:
        class: Apisearch\Plugin\MetadataFields\Domain\Middleware\IndexItemsMiddleware
        arguments:
            - "@apisearch_plugin.metadata_fields.repository"
        tags:
            - { name: apisearch_plugin.middleware }
```
