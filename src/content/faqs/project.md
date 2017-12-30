---
title: FAQS about the project
description: FAQs - About the project
page: 1
icon: angle-right
category: FAQs
template: one-column-with-toc.mustache
source: faqs/project.md
tags:
  - apisearch
  - apisearch-docs
  - faqs
---

## What is Apisearch?

## Where can I signup in Apisearch?

## How can I create a new app?

Once you've been logged in Apisearch panel, you can create a new app.

## How many apps can I create?

You can create as many apps as you want. Each app represents a different
repository, so for example, if you have 2 different e-commerce, each one with
a closed set of products, you should use two different apps.

## How can I get some tokens?

By default, by creating a new app the system will generate 3 tokens for you.
These tokens cannot be deleted, and only can be regenerated if they are
compromised.

Each one of them have an specific purpose. Visit token chapter for more
information.

## Can I generate more than one token?

In fact, you should. Each one of your tokens will be assigned one or several
endpoint permissions. It means that, for example, you should use read-only
tokens in your UI snippets, restricting any write operation. Then, in your
backend projects, you can have another private token with write permissions.

## Someone stole one of my tokens. Can I change them?

You can. In your Apisearch administration panel, under your app section, you
will find where to manage your tokens.

## If I lose my data, can I recover it?