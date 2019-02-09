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

```yml
Path : /v1/interaction
Verb : GET
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    interaction: Interaction
```
