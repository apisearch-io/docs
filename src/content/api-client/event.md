---
page: 6
icon: angle-right
title: Event
description: Apisearch client - Event object
category: API Client
template: one-column-with-toc.mustache
source: api-client/event.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch model
---

# Event

Do you remember that each Repository interaction creates a simple Event? That is
because we track every single movement you make to our servers. And this is good
because then you can make some external conclusions by retrieving, checking and
manipulating these events.

## Event Repository

So let's take a look at how you can retrieve all these events and check as many
metrics as you want. With this example, we get all first 100 Queries done from
yesterday at same hour until now.

```php
$eventRepository = new EventRepository(
    new GuzzleClient('http://api.ourhost.xyz:1234')
);

$repository->all(
    'mysecretkey',
    'QueryWasMade',
    (time() - (24 * 60 * 60)),
    time(),
    100,
    0
);
```

You can check all the Event types after some chapters.

## Event Object

Each EventRepository call will return an array of Event instances. Each one of
them is a very simple class that has everything involved in the event itself.

```php
/**
 * Class Event.
 */
class Event implements HttpTransportable
{
    /**
     * @var int
     *
     * Id
     */
    private $id;

    /**
     * var string.
     *
     * Consistency hash
     */
    private $consistencyHash;

    /**
     * @var string
     *
     * name
     */
    private $name;

    /**
     * @var string
     *
     * Key
     */
    private $key;

    /**
     * @var string
     *
     * Payload
     */
    private $payload;

    /**
     * @var int
     *
     * Occurred on
     */
    private $occurredOn;
}
```

When retrieving the payload, you will receive a json encoded array, so make sure
you decode it if you want to digg into the event content.

```php
$payload = json_decode($event->getPayload(), true);
```

## Event types

Each type of action against your data set means a different event. To be honest,
once you have all the events sorted over the time, you should be able to
regenerate your index from the first time you generated it.

We can divide the events in two big groups

### Write online events

These events will only write elements in your index. This means that no response
is expected at all.

- IndexWasReset : You reset your index
- ItemsWereIndexed : You index some items
- ItemsWereDeleted : You delete some items

These events will contain all the data inside your specification. For example.
You will find the item content inside each ItemsWereIndexed events, so if in the
future you need to rewrite the entire index from the beginning, you will notice
that you can check items values from the past.

### Readonly events

These events don't cause any index change. It is not really important the order
over the time, only for statistics purposes.

- QueryWasMade : Each query is made. Because you can check the items content at
the time the query was made by checking the index status using the write only
events, the result will only contain the Items ids instead of all the content.
