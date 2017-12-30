---
root: true
page: 2
icon: code
title: API Client
description: API reference for the different Apisearch clients
category: API Client
template: one-column.mustache
source: api-client.md
languages: ~
tags:
  - apisearch-tools
  - apisearch ui
  - search components
---

# Api Client

In this chapter we will explain how different clients work. All clients are
supposed to work as a middle between a language and the final API format, so all
clients should work the same way with the same features. Of course, some
languages will implement all features, and some languages will implement only
some of them, because the client is not finished and completed yet (we will
explicitly point that) or because the client is not intended to implement them
because of its nature (for exemple, javascript client will not implement write
features, only read ones)

Some clients can be divided in different repositories, and some of them can be
unified everything in one. That information will be told in each case.

This is the table of contents

- [Model](api-client/model.html)
- [Query](api-client/query.html)
- [Result](api-client/result.html)
- [Repository](api-client/repository.html)
- [Event](api-client/event.html)
- [Config](api-client/config.html)