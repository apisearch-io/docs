---
title: User
description: HTTP Reference - User
icon: angle-right
page: 4
category: HTTP Reference
template: one-column-with-toc.mustache
source: http-reference/user.md
tags:
  - http
  - reference
  - user
---

### Add Interaction

Add a new interaction inside the system.

- Endpoint name - v1_post_interaction
- Path - /v1/**{{ app_id }}**/interactions
- Verb - **POST**
- Body - An instance of [Interaction](/model.html#interaction) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"

This is a write-only endpoint, and eventually, all write only endpoints could be
processed in an asynchronous way

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure that no one
has a default values in their installation, and creating a vulnerability, no
default values are created.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/interactions" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "user": {
            "id": "999",
            "attributes": {
                "age": 33
            }
        },
        "item_uuid": {
            "id": "123"
        },
        "event_name": "click",
        "metadata": {
            "position": 2
        }
    }
'
```