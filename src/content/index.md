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

## Download and install Apisearch

Apisearch is an open source project. This means that you can download Apisearch
for free and install it in your own servers.

In order to start using Apisearch, you only need a server with these installed
packages

- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/).

With these two tools you will be able to have running your Apisearch Server
instance in 2 minutes. Let's do it!

First of all we need to get the repository from the source. Because this
repository does'nt really need dependencies, we will download it by using wget
instead of git.

Check the version of the tarball in order to always get the last one or an
specific one, depending on your needs

```bash
wget --no-check-certificate --content-disposition -O docker-search-server.tar.gz https://github.com/apisearch-io/docker-search-server/tarball/0.0.1
tar -xvzf docker-search-server.tar.gz
cd docker-search-server
```

You can also get the last master code. This will get the last code pushed in
master, but not tagged as stable yet.

```bash
wget --no-check-certificate --content-disposition -O docker-search-server.tar.gz https://github.com/apisearch-io/docker-search-server/archive/master.tar.gz
tar -xvzf docker-search-server.tar.gz
cd docker-search-server
```

Once our code is properly downloaded, we only need to build and run all our
containers. Everything in one simple and short line.

```bash
docker-compose up --build
```

That's it. Congratulations. You already have Apisearch running in your server.
Now let's go a little bit further with that. Let's create a new index with a
write-read token for you to start using Apisearch as fast as possble.

```
docker exec -i -t $(docker ps -qf "name=apisearch_server") /easy-setup.sh
```

It is important the output of this command execution. The command will generate
you some random tokens for your application. To start fast with a simple demo,
you should use the admin one for indexing and deleting from your private
application. Take in account that with this token anyone could manage your data,
and even destroy it, so keep it secret.

You can use the query one for your public applications, for example the
javascript integration. This token has only read-only permissions.

Let's ping our new index using our admin token. Replace `{{admin_token}}` with
your auto generated admin token.

```bash
curl --silent --head --write-out '%{http_code}\n' 'http://localhost:8200/ping?app_id=96a53eaf&index=e7185a86&token={{ admin_token }}'
```

You should have a 200 response code. And this means that your repository is
ready to be used by any application.

## Create your first application

    > This section is under construction

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