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

Until there's no stable releases, we will work with the HEAD of master version.

```bash
wget --no-check-certificate --content-disposition -O basic-infrastructure.tar.gz https://github.com/apisearch-io/basic-infrastructure/archive/master.tar.gz
tar -xvzf basic-infrastructure.tar.gz
cd basic-infrastructuregra
```

Once our code is properly downloaded, we only need to configure some environment
variable to customize as much as we want the server and build and run all our
containers.

Apisearch works with a file called `.env` placed in the root of the project.
You might update some of these values with your own values (we don't setup
default values to prevent security issues). You will find an skeleton of the
file inside the root of the project with the name `.env.dist`

```
APISEARCH_PORT=8100

APISEARCH_GOD_TOKEN=
APISEARCH_READONLY_TOKEN=
APISEARCH_PING_TOKEN=

ELASTICSEARCH_HOST=apisearch_elasticsearch
ELASTICSEARCH_PORT=9200

REDIS_HOST=apisearch_redis
REDIS_PORT=6379
```

Make sure you **update this values** before building your containers.
Once finished, let's build and run all our containers.

```bash
docker-compose up --build
```

> This process might be a little bit long. Maybe a couple of minutes, depending
> on how fast your internet connection is. Take the opportunity to drink a glass
> of water and move a little bit your legs :)

At this point you might encounter some of these problems. Please, check all of
them if you have any issue, and if any of them is not included in this list,
please ping the organization in our 
[Gitter Channel](https://gitter.im/apisearch_io) or
[Open an Issue](https://github.com/apisearch-io/search-server/issues/new)

> Docker cannot even start. This message appears: **WARNING: The APISEARCH_PORT
> variable is not set. Defaulting to a blank string.**  
> In this case, please check that there is a file called **.env** in the root of
> Apisearch server with the required APISEARCH_* environment values.

> Docker is telling that some ports are already mapped by anyone else.  
> This project exports these ports: **8100** as the balancer entrypoint (this
> value is defined as an environment value, feel free to change it),
> **8200..8204** as the Apisearch enabled workers, **9200** as the Elasticsearch
> port, and **6379** as the redis port.  
> Make sure that these ports are not being used in your local host or in any 
> Docker container

> Elasticsearch stops with a message like this: **apisearch_elasticsearch | [1]: 
> max virtual memory areas vm.max_map_count [65530] is too low, increase to at 
> least [262144]**.  
> Follow the instructions [Here](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-cli-run-prod-mode)
> to solve that problem and restart the docker

> Apisearch do not respond properly with the admin token you've proposed.
> In this case, please check that there is a file called **.env** in the root of
> Apisearch server with the required APISEARCH_* environment values.

That's it. Congratulations. You already have Apisearch running in your server.
Now let's go a little bit further with that. First of all, our first call to
Apisearch, the Apisearch *hello world*. As you can see, we will use the
environment variable **APISEARCH_GOD_TOKEN** as the token to use everywhere,
with full access to the entire environment.

```bash
curl --silent --head --write-out '%{http_code}\n' 'http://localhost:8100?token={{ APISEARCH_GOD_TOKEN }}'
```

That curl should return us a **200**. You could try the same action, but in this
case using the **APISEARCH_PING_TOKEN**, and specific token with only one
possible action of ping.

Once we have our engine running, let's create a new index with a write-read 
token for you to start using Apisearch as fast as possble with real data.

```
docker exec -i -t $(docker ps -qf "name=apisearch_server_0") apisearch/scripts/easy-setup
```

> Check the output of the command. You will see that the system has generated
> you a random app_id and a random index_id for security reasons.  
> Use them in your next specific app and index commands.

It is important the output of this command execution. The command will generate
you some random tokens for your application. To start fast with a simple demo,
you should use the admin one for indexing and deleting from your private
application. Take in account that with this token anyone could manage your data,
and even destroy it, so keep it secret.

You can use the query one for your public applications, for example the
javascript integration. This token has only read-only permissions.

Let's make an empty query (match all) on our new index using our admin token.
Replace `{{admin_token}}` with your auto generated admin token. We'll be able to
use this token only when calling this app or index related endpoints, but never
for environment actions (use **APISEARCH_PING_TOKEN** for such actions).

```bash
curl 'http://localhost:8100/v1?app_id={{ app_id }}&index={{ index_id }}&token={{ admin_token }}'
```

> Take in account that in this example we're using 8100 as our default port. If
> you changed this port in your environment file, consider changing it here as
> well.

You should have a 200 response code and an empty set of items as response. This
means that your repository is ready to be used by any application.

Let's make another fast check of our infrastructure by calling our check
endpoint. This endpoint will give some information about the status of the
cluster and the services working inside.

```bash
curl 'http://localhost:8100/health?token={{ APISEARCH_GOD_TOKEN }}'
```

At this point you could just follow this Quick Start document, or go to the
official API specifications; The main one, where you'll be able how to use
Apisearch through HTTP, and the

- [API Reference](/api-reference)
- [API Client](/api-client)

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
const ui = apisearchUI.create({
    app_id: 'xxx',
    index_id: 'yyy',
    token: 'zzz',
    options: {
        endpoint: 'http://localhost:8100'
    }
});
```

> Check that all the values in the configuration matches the installation you
> are actually trying. You should check as well the endpoint, both the host and
> the port used.

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