---
page: 1
icon: angle-right
title: Encoding Plugin
description: Apisearch plugins - Encoding
category: Plugins
template: one-column-with-toc.mustache
source: plugins/encoding.md
languages:
  - php
  - javascript
  - json
tags:
  - plugin
  - encoding
---

# Encoding Plugin

Encode your API responses.

## Motivation

Apisearch is designed to be an easy multi platform search engine. One of the
main goals is to decrease your infrastructure complexity by adding a unique 
point of access for all your read-only operations from all of your devices. And
you know that some of these devices can be small ones consuming from 4G. This is
why response sizes matters. Shorter responses mean faster and smaller responses.

## Installation

> Encoding Plugin is actually enabled in the main server distribution. By
> default all described features are already enabled.

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="encoding"
```

## GZIP / Deflate encoding

You can enable any of these encoding strategies by adding a simple HTTP header
in your request.

```
curl -XGET -H "Accept-Encoding: gzip" "http://localhost:80/v1/xxx"
```

If the plugin is enabled and working properly, you should see a response header
called `Content-Encoding`. If the content has been encoded properly, you will
find in this header the used method.

```
HTTP/1.1 200 OK
access-control-allow-origin: *
cache-control: max-age=0, private, s-maxage=0
date: Fri, 08 Mar 2019 16:40:26 GMT
content-type: application/json
content-encoding: gzip
X-Powered-By: React/alpha
Content-Length: 6393
Connection: close
```

You can use Deflate as well as an encoding method.

```
curl -XGET -H "Accept-Encoding: gzip" "http://localhost:80/v1/xxx"

HTTP/1.1 200 OK
access-control-allow-origin: *
cache-control: max-age=0, private, s-maxage=0
date: Fri, 08 Mar 2019 16:42:28 GMT
content-type: application/json
content-encoding: deflate
X-Powered-By: React/alpha
Content-Length: 6387
Connection: close
```