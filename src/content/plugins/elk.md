---
page: 1
icon: angle-right
title: ELK Plugin
description: Apisearch plugins - ELK
category: Plugins
template: one-column-with-toc.mustache
source: plugins/elk.md
languages: ~
tags:
  - plugin
  - elk
  - kibana
  - logstash
  - logs
  - elasticsearch
---

# ELK Plugin

The ELK plugin allows you to send all you domain events to a Kibana instance
through Logstash, using Redis. You can have many other logstash configurations,
but in this case, only the Redis adapter is installed.

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="elk"
```

In order to connect properly Apisearch with Redis, you need to add your
application credentials into the server. You can do it by adding some
configuration data.

```yml
apisearch_plugin_elk:
    host: xxx
    port: 6379
    is_cluster: false
    database: xxx
    key: xxx
    service: xxx
```

You can use environment variables as well.

```
REDIS_ELK_HOST=xxx
REDIS_ELK_PORT=xxx
REDIS_ELK_IS_CLUSTER=xxx
REDIS_ELK_DATABASE=xxx
REDIS_ELK_KEY=xxx
REDIS_ELK_SERVICE=xxx
```

> Events will only be sent to ELK if your server processes the domain events.
> This means that you need your server to process inline them all or enqueue
> them, having one queue consumers plugin enabled, like RedisQueues or Rabbitmq