# Create a plugin

Apisearch is implemented by doing [CQRS](https://www.martinfowler.com/bliki/CQRS.html).
This means that each time anyone uses Apisearch, a new command is created as a 
Value Object. This value should not be changed by anyone during it's life. This 
objects is taken by one and only one handler, and some actions are done by this
handler.

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

> The project uses a specific CQRS pattern implementation, and is not to be a
> perfect pattern implementation project.

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

## Creating a Middleware

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
different commands should be placed in several middleware classes.

After defined our class, we need to create the middleware service and tell 
Apisearch that this is a middleware that should be executed inside a plugin. For
such action, let's create a service definition with the tag 
`apisearch_plugin.middleware`.

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

> Apisearch will not ensure you the order between middleware classes, so you
> should only work with main Apisearch specification, and never have a hard
> dependency with other plugins.

## Apisearch Commands and Queries

But what is a Command and a Query? And the most important question, what
Commands and Queries can we find here in Apisearch? This project uses

A Command is this Value Object that we generate in all these first layers that
we can find around Apisearch. For example, the first layer when we come from the
HTTP layer is called Controller, and the first layer when we come from the 
console is called command. A Command is like an imperative action, and should
follow the same format always, no matter the interface we're using, for example.

So, the difference between a Command and a Query? Well, a Command is an action
that will change the internal status of the application, a write operation. The
status before and after applying this command could be barely different.

And can a Command have a response? Not at all. Only changes the state, and
because this operation could be asynchronous, we must assume that we will not
receive any response.

So, the question is, how can we retrieve information from Apisearch? Well, by
using Queries. A Query is a type of Command that instead of changing the status
of the application, only gets information from it and returns it.

- So, if I need to make a change into Apisearch and return it's new value, can
I do it by using Commands?
- Nopes. You can't. A single action means a single action, and this can be a
write action, what could be executed asynchronously sometime from a queue, or a
read action, which in this case you would return the value instantly.

## Commands

This is the main list of Apisaerch Commands. As you will see, all these actions
could be applied by using a queue, in an asynchronous way, and don't really need
to return any value.

> Some of these Commands application action is reduced to an specific app_id,
> an index, and always previous verification of a valid token.

- AddInteraction - A new interaction has been inserted in the system
- AddToken - Adds a new token
- ConfigureIndex - Configures an existing and previously created index. This
action may require to stop the index some time
- CreateIndex - Creates a new index
- DeleteAllInteractions - Deletes all available interactions
- DeleteIndex - Deletes an existing index
- DeleteItems - Deletes a set of Items defined by their identifiers
- DeleteToken - Deletes an existing token
- DeleteTokens - Deletes all existing tokens
- IndexItems - Indexes a set of items.
- ResetIndex - Resets the index. Removed all existing information.
- UpdateItems - Applies some updates over the existing items
- PauseConsumers - Pause all existing consumers given an array of types
- ResumeConsumers - Resume all existing consumers given an array of types

## Queries

This is the main list of Apisearch Queries. As you will see, all these actions
don't change the status of the application, and only ask for some information
from inside the system

> Some of these Query application action is reduced to an specific app_id,
> an index, and always previous verification of a valid token.

- CheckHealth - Checks the cluster health
- CheckIndex - Checks if an index is available
- GetTokens - Return all the existing tokens given an app i
- GetIndices - Return all the existing indices given an app id
- Ping - Makes a simple ping
- Query - Makes a query over all the existing Items
- GetCrontab - Crontab lines are required for local configuration

## Events in Apisearch

By using Middlewares what we do is to change the compositions of the Commands
themselves or the results that the associated handlers produce. But this is only
one part of the Plugins environment. What happens if we want to add an specific
action when Items are indexed in the system? Here some options for you.

* Add a middleware before these items are really indexed, and pray for not to
have an exception. Otherwise you'll have inconsistent data.
* Add a middleware after these items are really indexed, but this point is
specially designed for response manipulation. What if this action creates
several related actions, and you need one of them? For sure, you'll not be able
to access to this data

In order to take some actions at the same moment these happen, we introduce you
the Apisearch Domain Events. These are specially created to make sure you have
all needed information of what happen inside the project. And Event Subscribers
are the right way of subscribing to these events.

> If you define Apisearch to consume events, instead of a default inline mode,
> in an asynchronous way, you will not recieve these events once they happen,
> but when they are taken from the queue

## Creating an Event Subscriber

Let's see a simple event subscriber implementation.

```php
/**
 * Class MyEventSubscriber.
 */
class MyEventSubscriber implements EventSubscriber
{
    /**
     * Subscriber should handle event.
     *
     * @param DomainEventWithRepositoryReference $domainEventWithRepositoryReference
     *
     * @return bool
     */
    public function shouldHandleEvent(DomainEventWithRepositoryReference $domainEventWithRepositoryReference): bool
    {
        return Query::class;
    }

    /**
     * Handle event.
     *
     * @param DomainEventWithRepositoryReference $domainEventWithRepositoryReference
     */
    public function handle(DomainEventWithRepositoryReference $domainEventWithRepositoryReference)
    {
        // Do something when a new Query is handled by Apisearch
        
        $repositoryReference = $domainEventWithRepositoryReference->getRepositoryReference();
        $domainEvent = $domainEventWithRepositoryReference->getDomainEvent();
    }
}
```

The first method would return if, given a Domain Event, the subscribe is valid.
One Domain Event, one subscriber. That will help us the split between files all
our domain logic.

After we created the class, we need to publish it as an event subscriber.

```yml
services:
    my_service:
        class: My\Event\Subscriber
        tags:
            - { name: apisearch_server.domain_event_subscriber }
```

## Domain Events

These are the available Domain Events inside Apisearch.

- IndexWasConfigured - An existing Index has been configured
- IndexWasReset - Index has been reset and all Items inside were removed
- InteractionWasAdded - A new interaction has been added
- ItemsWereDeleted - Some items have been deleted from the engine
- ItemsWereAdded - Some items have been added in the engine
- ItemsWereUpdated - Some items have been updated
- QueryWasMade - A new Query has been done
- TokensWereDeleted - All tokens were deleted
- TokenWasAdded - A new token has been added
- TokenWasDeleted - An existing token was deleted