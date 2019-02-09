---
root: true
page: 4
icon: code
title: Client Reference
description: Client reference
category: Client Reference
template: one-column-with-toc.mustache
source: client-reference.md
languages: ~
tags:
  - client
  - reference
---

# Client Reference

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

- [Item Creation](client-reference/item-creation.html)
- [Query Creation](client-reference/query-creation.html)
- [Result Manipulation](client-reference/result-manipulation.html)
- [Repository](client-reference/repository.html)
- [App Repository](client-reference/app-repository.html)
