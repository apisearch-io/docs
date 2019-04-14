---
root: true
page: 3
icon: exchange
title: Server
description: Server
category: Server
template: one-column-with-toc.mustache
source: server.md
tags:
  - server
---

# Server

In this chapter we will talk about the Apisearch server. How to install it, how
to configure it and all the multiples ways it can properly work, depending on
the user needs.

## Architecture

Apisearch uses a PHP command bus called Tactician. This project exposes a
simple but effective command bus, ready to be used with both commands and
queries. The whole project is built on top of this architecture and philosophy,
allowing, for example, all plugins to add middleware classes and listening only
some commands or queries. 

This architecture is quite effective, and has allowed us to extend the project
as much as we have wanted in a plugins way, letting the core of the project as
it is, and locking it for future features.

## Inline Vs. Asynchronous

We can configure our server to work as an inline project (our asynchronous
actions will not be enqueued, but resolved at the same moment) or an
asynchronous project (these actions will be enqueued somewhere, and the project,
eventually, will consume these actions and resolve them).

You can define this behavior both with the Commands and Domain Events, but if
some of them must be enqueued, then you must have a queue plugin installed.
Otherwise you will get an exception.

For the commands, you have two options when configuring them. The final impact
for both of them will be an extra piece in your infrastructure (redis,
rabbitmq...) and a increase of performance in most of write operations.

```yml
apisearch_server:
    commands_adapter: [inline, enqueue]
```

You can define this value as well by using environment variables.

```
APISEARCH_COMMANDS_ADAPTER=
```

If your option is `enqueue`, then your configuration will have to be a little
more extended. In that case, you have to install a queues plugin to make that
happen. As soon as you install it, then your commands will start to be enqueued
in your chosen engine, but you will have to consume. 

In order to do that, you will find a new console command.

```bash
php bin/console apisearch-consumer:commands
```

As soon as you start the process, you will start consuming messages.

For the domain events, you will have mainly the same options, adding an extra
one called `ignore`. You can ignore the domain events if you don't really need
them, but take in account that many plugins work with these events, for example
the plugins that log your activity in external projects (newrelic, ELK...) or
plugins that change the behavior of the results by checking your query activity
and interactions.

```yml
apisearch_server:
    domain_events_adapter: [inline, enqueue, ignore]
```

You can define this value as well by using environment variables.

```
APISEARCH_DOMAIN_EVENTS_ADAPTER=
```

By using enqueue option, you will have the same circumstances than the commands.
In that case, and enabling a queues plugin, you fill find a new console command
where you will be able to consume all domain events.

```bash
php bin/console apisearch-consumer:domain-events
```

> Both consumers are simple Symfony console commands. You will find all the
> configuration options than you've found until now, like environment or verbose
> options.

## The server

Apisearch doesn't need any Apache nor Nginx to work, saving this way many 
milliseconds of performance when serving query requests.

## Plugins
