---
page: 1
icon: angle-right
title: New Relic Plugin
description: Apisearch plugins - New Relic
category: Plugins
template: one-column-with-toc.mustache
source: plugins/new-relic.md
languages: ~
tags:
  - plugin
  - new-relic
---

# New Relic Plugin

With this plugin you will be able to integrate Apisearch with New Relic by just
enabling it, and adding your credentials.

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="newrelic"
```

In order to connect properly Apisearch with NewRelic, you need to add your
application credentials into the server. You can do it by adding some
configuration data.

```yml
apisearch_plugin_newrelic:
    application_name: xxx
    api_key: xxx
    license_key: xxx
```

You can use environment variables as well.

```
NEWRELIC_APP_NAME=xxx
NEWRELIC_API_KEY=xxx
NEWRELIC_LICENSE_KEY=xxx
```