---
title: Application API
description: Api Reference - Application
icon: angle-right
page: 2
category: API Reference
template: one-column-with-toc.mustache
source: api-reference/application.md
languages: 
  - php
  - javascript
  - json
tags:
  - apisearch reference
  - http
  - json
---

### Add Token

Add a new token inside the system. If the token already exists, this new Token
will overwrite the old one.

```yml
Path - /v1/token
Verb - POST
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    - token: Token
```

### Configure Index

Configure the index once this one is already created.

```yml
Path - /v1/index
Verb - PUT
Query_Parameters:
    app_id: string
    index: string
    token: string
Body:
    - config: Config
```

### Create Index
### Delete Index
### Delete Token
### Delete Tokens
### Reset Index
### Check Health
### Check Index
### Get Tokens
### Ping