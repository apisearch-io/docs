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
cd basic-infrastructure-master
```

Once our code is properly downloaded, we only need to configure some environment
variable to customize as much as we want the server and build and run all our
containers.

Apisearch works with a file called `.env` placed in the root of the project.
You might update some of these values with your own values (we don't setup
default values to prevent security issues). You will find an skeleton of the
file inside the root of the project with the name `.env.dist`.

> This is an example of what you can find in your `.env.dist`. As you can see,
> the environment is ready to accept a local ELK installation, so you can enable
> the plugin. Same happens with New Relic. Feel free to change this values with
> your own configuration values.

```
APISEARCH_PORT=8100

APISEARCH_GOD_TOKEN=
APISEARCH_READONLY_TOKEN=
APISEARCH_PING_TOKEN=
APISEARCH_ENABLED_PLUGINS=elk,newrelic

ELASTICSEARCH_HOST=apisearch.elasticsearch
ELASTICSEARCH_PORT=9200

REDIS_STORAGE_HOST=apisearch.redis
REDIS_STORAGE_PORT=6379

REDIS_QUEUE_HOST=apisearch.redis
REDIS_QUEUE_PORT=6379

REDIS_ELK_HOST=apisearch.redis
REDIS_ELK_PORT=6379
REDIS_ELK_KEY=logstash.apisearch

NEWRELIC_APP_NAME=
NEWRELIC_API_KEY=
NEWRELIC_LICENSE_KEY=
```

Make sure you **update this values** before building your containers.
Once finished, let's build and run all our containers.

```bash
docker-compose up --build
```

> This process might be a little bit long. Maybe a couple of minutes, depending
> on how fast your internet connection is. Take the opportunity to drink a glass
> of water and move a little bit your legs :)

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

Let's make another fast check of our infrastructure by calling our check
endpoint. This endpoint will give some information about the status of the
cluster and the services working inside.

```bash
curl 'http://localhost:8100/health?token={{ APISEARCH_GOD_TOKEN }}'
```

### Have any problem?

At this point you might encounter some of these problems. Please, check all of
them if you have any issue, and if any of them is not included in this list,
please ping the organization in our 
- [Ping us on our Gitter Channel](https://gitter.im/apisearch_io)
- [Open an Issue on Github](https://github.com/apisearch-io/search-server/issues/new)
- [Tweet us](https://twitter.com/apisearch_io)

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

## Create your first application

Once we have our engine running, it's time to create our first application.
The server will always be accessible by its own API endpoints, but in this small
tutorial, we will use the internal commands placed in the same server by
entering inside one of the server docker containers.

```
docker exec -it apisearch.server.0 bash
```

> From this point, all commands will be executed inside this container.

Inside the container, we need to place ourselves inside the server root. Once we
are there, we can list all the available commands.

```
cd /var/www/apisearch
bin/console --env=prod
```

Our next steps will be

* Create a new empty application index
* Create some tokens in order to manage the access of our data across all our
applications.

Let's do it!

First of all, let's create a new application index. For this purpose, we will
need an application identifier and an index identifier. The different between
them is that an Application can handle different indices, each of them hosting
different type of items. By placing your data into different indices you will be
able to create tokens with permissions in some indices, implementing a very
strict security layer in your application. You will be able to query across 
different indices as well, so index architecture should be as much flexible as
your requisites need.

> Make sure your identifiers are unique and random to prevent security holes.
> You can use some online service to generate UUID values like
> [uuidgenerator.net](https://www.uuidgenerator.net/)

> We recommend to use 8 hex characters for identifier ids, and UUID v4 values
> for tokens. This is a recommendation, but of course, feel free to use as much
> security as you need for your application. The more security, the best for you

After these recommendations, and in order to be clear for you in this tutorial,
we will use a much more clear unique identifiers.

Use the specific command to create a new index. The application id will be
`marvel` as our application will handle multiple type of elements, all related
to the marvel world. The index we are going to create first of all inside
`marvel` application will be `comics`, so in this index we will store mainly
marvel comics.

```
bin/console apisearch-server:create-index marvel comics --env=prod
```

Your output should be something like that. The server output will always be as
much verbose as the occasion needs by default.

```
[Apisearch] Command started at Sat, 25 Aug 2018 23:31:23 +0000

[Create index] App ID: marvel
[Create index] Index ID: comics
[Create index] Index created properly

[Apisearch] Command finished in 122 milliseconds
[Apisearch] Max memory used: 8388608 bytes
```

It seems that we already have an index created, right? But you know, never trust
a console before checking yourself that everything was fine

```
bin/console apisearch-server:check-index marvel comics --env=prod
```

This command will check if given configuration is valid and the index under
given application id already exists. That should be the output for the command

```
[Apisearch] Command started at Sun, 26 Aug 2018 01:37:47 +0200

[Check index] Index available

[Apisearch] Command finished in 10 milliseconds
[Apisearch] Max memory used: 16777216 bytes
```

We can check as well all our created indices by listing them all. In order to
filter your indices by an specific application, you can define this application
as well.

```
bin/console apisearch-server:print-indices --env=prod
bin/console apisearch-server:print-indices --app-id=marvel --env=prod
```

Finally, let's create some tokens for our application. As a simple information,
you will be able to create as many tokens as you want by only using this
console, or by using the API, but for this small tutorial, we will use a special
command placed in the server to generate a simple set of usable random tokens.

Tokens are generated for an application, and granted for one or multiple
indices, endpoints and plugins. These generated tokens will be generated for all
application indices.

```
bin/console apisearch-server:generate-basic-tokens marvel --env=prod
```

This command should generate an output like this.

```
[Apisearch] Command started at Sun, 26 Aug 2018 01:50:21 +0200

[Create basic tokens] App ID: marvel
[Create basic tokens] Token with UUID d5d9dc37-1a88-4d1e-a7bd-8c7c41020546 generated for admin
[Create basic tokens] Token with UUID ab0e9cd7-9180-4c51-a419-467da5421e7f generated for query only
[Create basic tokens] Token with UUID 3017a802-b8e5-4368-8ca1-e088e9bcf188 generated for interaction
[Create basic tokens] Tokens created properly

[Apisearch] Command finished in 8 milliseconds
[Apisearch] Max memory used: 8388608 bytes
```

As you can see, some tokens have been generated randomly for you. In order to
check that the tokens have properly been generated, we can list all application
tokens.

```
bin/console apisearch-server:print-tokens marvel --env=prod
```

So that's it! At this point we should have

- An application called `marvel` with the empty index `comics`
- Some tokens generated with different permissions

## Import some items

Once we have a created index, let's add some data into it. For this example, we
will use a small repository placed in our main Github organization called
[Example Marvel](https://github.com/apisearch-io/example-marvel).

We don't really have to download the repository, so the import command accept
both local files and remote files. Let's see how to import this file.
```
bin/console apisearch-server:import-index marvel comics https://raw.githubusercontent.com/apisearch-io/example-marvel/master/marvel.as
```

This command will import the file into your previously generated index, so if
you list all your indices again, you will see a small change; the number of
items inside the index.

```
bin/console apisearch-server:print-indices --app-id=marvel --env=prod
```

This command, now, will output something like this

```
[Apisearch] Command started at Sun, 26 Aug 2018 00:07:57 +0000

+--------+--------+-----------+
| AppId  | Name   | Doc Count |
+--------+--------+-----------+
| marvel | comics | 11343     |
+--------+--------+-----------+

[Apisearch] Command finished in 10 milliseconds
[Apisearch] Max memory used: 14680064 bytes
```

So, we have already some items inside the index!
Yay!

## Create my first search bar

Now we can exit the docker container, so the data is already inside the server.
We should focus now on our application, and by application we mean the frontend
website where you will place the search engine.

In this tutorial, we will create a small Marvel comics search bar, where we will
be able to search across some comic titles, filter by some elements and search
our favourite saga in milliseconds.

In order to do that, we will download in our local filesystem the
[Example Marvel](https://github.com/apisearch-io/example-marvel) repository. You
can clone the repository and use yours in order to push changes if you need to.

Once cloned, and if you followed this tutorial as it is with no alternative
changes, you **ONLY** need to make a simple addition; the token your server
generated in order to be able to query over your index. Check the `index.html`
file where the token is defined, and add yours.

Once added, you can access directly to this file by using your browser... and
you'll be using Apisearch for the first time :)

![alt text](/assets/media/marvel-example.jpg "Marvel example")

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

## Support us

Apisearch is an open source project, so the more you use us, the more you
contribute and the more issues you find, the best project it is. Beyond that, 
you can actively support the project by making us a small star in our main
Github repository
[Search Server](https://github.com/apisearch-io/search-server).
We will appreciate it so much :)