---
title: Server
description: HTTP Reference - Server
icon: angle-right
page: 2
category: HTTP Reference
template: one-column-with-toc.mustache
source: http-reference/server.md
tags:
  - http
  - reference
  - server
---

# Server API

Use these endpoints to manage your server options

## Check Health

By using this endpoint you will be able to check the service statuses and memory usage.

```bash
curl -XGET "http://localhost:8100/health?app_id={{ your_app_id }}&token={{ your_token }}"
```

This endpoint will return an array like below: 

```
{
    "status": {
        "elasticsearch": "green",
        "redis": true
    },
    "process": {
        "memory_used": 6867528
    }
}
```

## Ping

Perform a simple ping to the server. This endpoints will not perform any extra
validation than a simple server check, no matter the internal connections to
third party servers, and no matter the amount of plugins installed.

```bash
curl -XHEAD "http://localhost:8100"
```

The response will be a `200` if the server is alive, or another code otherwise.