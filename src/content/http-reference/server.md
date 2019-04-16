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

By using this endpoint you will be able to check the service statuses and memory
usage.

This is the endpoint reference

- Endpoint name - check_health
- Path - /health
- Verb - **GET**
- Headers
    - Apisearch-token-id: "{{ token_id }}"

> Token can be passed as well, instead of a header, by using the query parameter
> *token*

This is read-only endpoint. The first example shows how to use the token as a
header, and the second example, as a query parameter. Both examples are equals.

```bash
curl -X GET "http://localhost:8100/health" \
    -H "Apisearch-token-id: {{ token }}"
```

```bash
curl -X GET "http://localhost:8100/health?token={{ token }}"
```

This endpoint will return an array like this one. The content may change
depending on the enabled plugins, or if the server adds more information over
the time. The return status code will always be `200` if all services are
working as expected, as a *healty* status.

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

This is the endpoint reference

- Endpoint name - ping
- Path - /
- Verb - **HEAD**
- Headers
    - Apisearch-token-id: "{{ token_id }}"

> Token can be passed as well, instead of a header, by using the query parameter
> *token*

This is read-only endpoint. The first example shows how to use the token as a
header, and the second example, as a query parameter. Both examples are equals.

```bash
curl --head "http://localhost:8100" \
    -H "Apisearch-token-id: {{ token }}"
```

```bash
curl --head "http://localhost:8100?token={{ token }}"
```

The response will be a `200` if the server is alive, or another code otherwise.