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

## Is this for me?

Well. It depends. What kind of project are you working on? We are trying to
cover a small of use cases, so you're lucky if yours is one of them.
Of course, they are some projects we've been explicitly covering while we were
building the product, but we're sure than even many more can be properly covered
using Apisearch.

- E-commerce : We offer some integration tools for your e-commerce. Your
public data will be stored in our servers and served in an amazing way to your
users by using our Javascript UI libraries. Even if you're not using any
e-commerce framework, you can use our clients and plugins to make it on your own
way. Everything is ready for you to use it.
- Sample website . Offer to your final users the better experience possible,
even if your sample is millions items large. We can scale as much as you need.
- Crawling : One of the scenarios we were thinking when designing the project
was when making some Crawling. No hard persistence layer needed, but
evolutionary data can be reviewed. Great to show how data changed over the time.
- Database-less applications : We can be your database. That simple. Accessible
from everywhere, make all your applications work with the same entry point.

## Create an Apisearch account

The first thing you should do in order to start using Apisearch is to create a
new account at [https://admin.apisearch.io](https://admin.apisearch.io). If the
website is not opened for new registrations and you want to request a new
invitation, then don't hesitate to write us at invitations@puntmig.com.

![Login](/assets/media/login.png#inline)

As a user you could be able to

- Manage your own information and custom your panel
- Manage your apps and indexes
- Manage your access tokens
- Manage your campaigns
- Manage your billing information

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

![Login](/assets/media/new-app.png#inline)

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

In Apisearch you can work with some accepted and common formats. Some of them
are basically implemented because are multi platform, like CSV or JSON, but some
of them are specifically implemented because are human friendly, like Yaml. In
this chapter we will use this last one.

Let's add some fake items in our index. You will find a simple *Add Items*
button in your index main page. In that page, you will be able to add items
manually, or import an existing file. You will find some information about how
to export and import your index in our [FAQS ahout the admin](faqs/admin.html).

You items would look like this.

```yaml
header:
    metadata: [name, description, image]
    indexed_metadata: [sku, type]
    searchable_metadata: [name, description]
item_1:
    id: 1
    sku: 74398742973428
    name: T-shirt future
    description: T-shirt from the future
    type: t-shirt
    image: /img/t-shirt1.jpg
item_2:
    id: 2
    sku: 43289748932744
    name: Alabama T-shirt
    description: Model from Alabama. Will show you how amazing can it be
    type: t-shirt
    image: /img/t-shirt2.jpg
item_3:
    id: 3
    sku: 43289748932744
    name: Model R
    description: R from Romania. Will shine in th dark
    type: t-shirt
    image: /img/t-shirt3.jpg
item_4:
    id: 4
    sku: 37897489278798
    name: Customizable T-shirt
    description: Customize your t-shirt
    type: t-shirt
    image: /img/t-shirt4.jpg
```

With that code, you would add 2 items with these fields, and with the
particularity that:

- You could filter your data by sku and type fields
- You could search your data by name and description fields
- Fields name, description and image would only be saved, but would not be
filtered by them

## Create my first search bar

Finally. Let's check some important steps here

- We have an App with an id
- We have an Index with an id
- We have some generated tokens. At least, one with read-only permissions
- We have some data indexed

So, what's next? Let's create a simple search widget, where we can search by a
text field. This widget will be simple, but in the future you could add some
extra UI widgets in order to make your environment more powerful and complex.

To create your first search bar, first of all you should add our JS library as
a javascript line in your html.

```html
<script src="https://cdn.jsdelivr.net/npm/apisearch-ui/dist/apisearch-ui.min.js"></script>
```

Then, let's build our searcher. The first step is to build a simple Apisearch
client. In order to identify properly your credentials, check how to create
properly the Client. Remember to fill this data with yours.

```javascript
// Create instance
const ui = apisearchUI({
    appId: 'xxx',
    indexId: 'yyy',
    apiKey: 'zzz'
});
```

OK. Client done. Let's start by doing a simple skeleton in your html code. That
skeleton should be enough for you to make as many customizations as you need,
and to make the search engine very website friendly.

```html
<div id="search-container"></div>
<div id="results-container"></div>
```

That will be enough. Let's create the required widgets to make it work. Two
widgets needed. The first one for the searcher itself, and the second one for
the results container.

```javascript
ui.addWidgets(
    ui.widgets.simpleSearch({
        target: '.search-container',
    }),
    ui.widgets.result({
        target: '.result-container',
        template: {
            itemsList: '<ul>{{#items}} <li>{{metadata.name}}</li> {{/items}}</ul>',
        }
    })
);
```

That simple. This will make the magic.
Once your widget is properly defined, we need just another last step.  
Initialize the widgets.

```javascript
ui.init();
```

## Next steps

You have created your first search widget. And we're so happy you did it. Now we
offer you some links in case you want to continue digging into the project. We
enriched so much our FAQS with interesting information, so don't hesitate to
take a look at them

- [How can I integrate with Apisearch](integrations.html)
- [A little bit more about UI](ui.html)
- [FAQS](faqs.html)

Furthermore, if you don't find an specific topic, you can use our search bar
from every single corner of our documentation. It is build on top of Apisearch
as well, so we encourage you to use each time you need to find something.