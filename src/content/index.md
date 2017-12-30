---
root: true
page: 1
icon: dot-circle-o
title: First steps
description: How to start with Apisearch from the scratch
category: First Steps
template: one-column-with-toc.mustache
source: index.md
tags:
  - apisearch
  - apisearch-docs
---

# First steps

Apisearch is a easy-to-integrate search engine for your business.

By using our libraries, integration packages and clients you will be able to
boost your website and applications to the next level, introducing predictive 
features, allowing your final users to find what they are looking for in a way 
you never dreamed, and increasing your conversion rate.

You will be able, as well, to manage all your data across several platforms just
by enabling some plugins, to join marketplaces, analyze your users behavior in 
your site in order to take smart decisions, and know your business in a way you
did not expect until now.

In this documentation you should be able to find everything you need to start by
using Apisearch with no pain. The documentation itself has been designed,
precisely, to make you comfortable in front of all searches. Use our docs search
bar placed in the top of the website. Find by words, by examples, by code lines
or by whatever you have. You should find everything as fast as possible.

## Create an Apisearch account

The first thing you should do in order to start using Apisearch is to create a
new account at [https://admin.apisearch.io](https://admin.apisearch.io). If the
website is not opened for new registrations and you want to request a new
invitation, then don't hesitate to write us at invitations@puntmig.com.

As a user you could be able to

- Manage your own information and custom your panel
- Manage your apps and indexes
- Manage your billing information. This information can be overridden by app

## Create an App

Each user can manage many apps. The concept of an app is like a group of
possible indexes, each one containing related data. As an app holder, you will
be able to

- Manage your app information
- Manage your indexes
- Manage your billing information. By defining this information you will
override the one defined per user

When you create a new app, you're not creating anything in our Elasticsearch
databases. An app is only a virtual aggregation, so you will be able to create
as many apps as you want without much impact at all.

Once a new app is created, you will have an app_id, important to create external
integrations. You will be able to find it in your app panel in the admin
website. This app_id will never change and is unique, and because apisearch work
with tokens, don't worry if someone knows this app_id. Our data is safe with us.

By default, when you create a new index, a set of tokens are created for you
with different levels of permissions. These tokens are not deletable, in order
to make sure that you will have always some tokens to manage and access your
data from anywhere.

## Create a token

You can create as many tokens as you want, but remember that tokens with write
access can expose your data to third party people, so be careful to share and
publish these tokens.

When a token is compromised, you can regenerate it as many times as you want.
This token receives an immutable name, and a token value. This one is unique.

`f34d6da4-9ecd-48aa-9415-750c02ee9a19`

## Create an Index

Once you have created a new app, let's start by creating a new index. As soon as
you create a new index, you will be creating a new Elasticsearch empty set of
documents, so it will start by generating billing information. If you're under
a billing plan, then you'll be able to create this index under some plan 
limitations.

By default, a new index is created using a default configuration, so for our
fresh setup, we will not worry about this. If you have some interest in how to
configure your index, please visit the configuration part of the documentation.

Once you have a fresh new index, we can start uploading some data.

## Add some data

## Create my first search bar
