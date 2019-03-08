---
page: 1
icon: angle-right
title: RabbitMQ Plugin
description: Apisearch plugins - RabbitMQ
category: Plugins
template: one-column-with-toc.mustache
source: plugins/rabbitmq.md
tags:
  - plugin
  - rabitmq
  - queues
---

# RabbitMQ Plugin

Enable this integration with RabbitMQ and use this queue service to make
Apisearch asynchronous. Make your commands and domain events happen as soon as
possible, removing all user penalisation.

## Motivation

RabbitMQ is one of the most used and stable queues system in the market. This
plugin 

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="rabbitmq"
```

## Configuration

In order to make this bundle work you need to configure the connection settings
of the RabbitMQ server.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="security"
RABBITMQ_QUEUE_HOST=localhost
RABBITMQ_QUEUE_PORT=6379
RABBITMQ_QUEUE_USER=false
RABBITMQ_QUEUE_PASSWORD=xxx
RABBITMQ_QUEUE_VHOST=/
RABBITMQ_QUEUE_SECONDS_TO_WAIT_ON_BUSY=10
```

The only required are the host and the port.


