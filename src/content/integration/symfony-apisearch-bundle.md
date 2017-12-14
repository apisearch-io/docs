---
page: 1
title: Symfony - Apisearch Bundle
description: Apisearch integrations - Symfony Apisearch Bundle
category: Integrations
template: one-column.mustache
source: integration/symfony-apisearch-bundle.md
languages: 
  - php
tags:
  - apisearch-client
  - apisearch integration
  - symfony
  - bundle
---

# Event

Do you remember that each Repository interaction creates a simple Event? That is
because we track every single movement you make to our servers. And this is good
because if we can know, you can know.

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

Let's check as well all different events.

- IndexWasReset
- ItemsWereIndexed
- ItemsWereDeleted
- QueryWasMade

So, what does this endpoint return to us?

### Event

An array of Events. And what is an event? A very simple class that has
everything we need in order to make metrics, panels and side calculations.

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