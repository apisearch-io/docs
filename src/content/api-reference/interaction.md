---
title: Interaction API
description: Api Reference - Interaction
icon: angle-right
page: 4
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/interaction.md
languages: 
  - php
  - javascript
  - json
tags:
  - apisearch reference
  - http
  - json
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

### Delete all Interactions