---
root: true
page: 3
icon: exchange
title: Server Specification and Configuration
description: Check the server configuration, and how you can customize some parts of the behavior
template: one-column-with-toc.mustache
source: server.md
tags:
  - server
---

# Server

In this chapter we will talk about the Apisearch server. How to install it, how
to configure it and all the multiples ways it can properly work, depending on
the user needs.

## Architecture

Apisearch uses a PHP command bus called Tactician. This project exposes a
simple but effective command bus, ready to be used with both commands and
queries. The whole project is built on top of this architecture and philosophy,
allowing, for example, all plugins to add middleware classes and listening only
some commands or queries. 

This architecture is quite effective, and has allowed us to extend the project
as much as we have wanted in a plugins way, letting the core of the project as
it is, and locking it for future features.

## HTTP Routes

The server exposes a set of http routes, each one of them documented properly
under the [HTTP Reference](http-reference.html) chapter. In order to provide a
basic schema about what kind of urls you will find here, this is the basic
routing table exposed by Symfony.

```
 ------------------------------------ -------- -------- ------ ------------------------------------------------------- 
  Name                                 Method   Scheme   Host   Path                                                   
 ------------------------------------ -------- -------- ------ ------------------------------------------------------- 
  apisearch_v1_put_token               PUT      ANY      ANY    /v1/{app_id}/tokens                                    
  apisearch_v1_delete_token            DELETE   ANY      ANY    /v1/{app_id}/tokens/{token_id}                         
  apisearch_v1_get_tokens              GET      ANY      ANY    /v1/{app_id}/tokens                                    
  apisearch_v1_delete_tokens           DELETE   ANY      ANY    /v1/{app_id}/tokens                                    
  apisearch_v1_get_indices             GET      ANY      ANY    /v1/{app_id}/indices                                   
  apisearch_v1_put_index               PUT      ANY      ANY    /v1/{app_id}/indices/{index_id}                        
  apisearch_v1_delete_index            DELETE   ANY      ANY    /v1/{app_id}/indices/{index_id}                        
  apisearch_v1_reset_index             POST     ANY      ANY    /v1/{app_id}/indices/{index_id}/reset                  
  apisearch_v1_configure_index         POST     ANY      ANY    /v1/{app_id}/indices/{index_id}/configure              
  apisearch_v1_check_index             HEAD     ANY      ANY    /v1/{app_id}/indices/{index_id}                        
  apisearch_v1_put_items               PUT      ANY      ANY    /v1/{app_id}/indices/{index_id}/items                  
  apisearch_v1_update_items_by_query   POST     ANY      ANY    /v1/{app_id}/indices/{index_id}/items/update-by-query  
  apisearch_v1_delete_items            DELETE   ANY      ANY    /v1/{app_id}/indices/{index_id}/items                  
  apisearch_v1_query                   GET      ANY      ANY    /v1/{app_id}/indices/{index_id}                        
  apisearch_v1_query_all_indices       GET      ANY      ANY    /v1/{app_id}                                           
  apisearch_v1_post_interaction        POST     ANY      ANY    /v1/{app_id}/interactions                              
  apisearch_check_health               GET      ANY      ANY    /health                                                
  apisearch_ping                       HEAD     ANY      ANY    /                                                      
  apisearch_pause_consumers            POST     ANY      ANY    /consumers/pause                                       
  apisearch_resume_consumers           POST     ANY      ANY    /consumers/resume                                      
 ------------------------------------ -------- -------- ------ -------------------------------------------------------
 ```

## Inline Vs. Asynchronous

We can configure our server to work as an inline project (our asynchronous
actions will not be enqueued, but resolved at the same moment) or an
asynchronous project (these actions will be enqueued somewhere, and the project,
eventually, will consume these actions and resolve them).

You can define this behavior both with the Commands and Domain Events, but if
some of them must be enqueued, then you must have a queue plugin installed.
Otherwise you will get an exception.

For the commands, you have two options when configuring them. The final impact
for both of them will be an extra piece in your infrastructure (redis,
rabbitmq...) and a increase of performance in most of write operations.

```yml
apisearch_server:
    commands_adapter: [inline, enqueue]
```

You can define this value as well by using environment variables.

```
APISEARCH_COMMANDS_ADAPTER=
```

If your option is `enqueue`, then your configuration will have to be a little
more extended. In that case, you have to install a queues plugin to make that
happen. As soon as you install it, then your commands will start to be enqueued
in your chosen engine, but you will have to consume. 

In order to do that, you will find a new console command.

```bash
php bin/console apisearch-consumer:commands
```

As soon as you start the process, you will start consuming messages.

For the domain events, you will have mainly the same options, adding an extra
one called `ignore`. You can ignore the domain events if you don't really need
them, but take in account that many plugins work with these events, for example
the plugins that log your activity in external projects (newrelic, ELK...) or
plugins that change the behavior of the results by checking your query activity
and interactions.

```yml
apisearch_server:
    domain_events_adapter: [inline, enqueue, ignore]
```

You can define this value as well by using environment variables.

```
APISEARCH_DOMAIN_EVENTS_ADAPTER=
```

By using enqueue option, you will have the same circumstances than the commands.
In that case, and enabling a queues plugin, you fill find a new console command
where you will be able to consume all domain events.

```bash
php bin/console apisearch-consumer:domain-events
```

> Both consumers are simple Symfony console commands. You will find all the
> configuration options than you've found until now, like environment or verbose
> options.

## The HTTP server

Apisearch doesn't need any Apache nor Nginx to work, saving this way many 
milliseconds of performance when serving query requests. Apisearch used a PHP
project called [PPM](https://github.com/php-pm/php-pm), built on top of
[ReactPHP](https://reactphp.org/) in order to manage multiple internal PHP 
threads, each one assuming the work of a single PHP server.

Once composer has installed all the dependencies, you will find two different
ways of making your server start working. We strongly recommend to use, for
development and testing, the basic one.

```
php bin/server 0.0.0.0:8200
```

This is a simple PHP script based on ReactPHP that will create a simple server,
listening your defined port. You can stop the server by using `Ctrl+C` and start
again as many times as you need.

On the other hand, in production, we strongly recommend to use the PPM one.

```
php vendor/bin/ppm start --host=0.0.0.0 --port=8200 --workers=3 \
    --bootstrap=OneBundleApp\\PPM\\Adapter \
    --bridge=OneBundleApp\\PPM\\Bridge \
    --app-env=prod --debug=0 --logging=0
```

You will create 3 workers in that case, and the server will start serving with 
the first worker. As soon as the first is busy and cannot server anymore, and
until is free again, worker 2 will start working. And so on.

> Having multiple workers is not free. Each worker can consume so much memory,
> so please, don't start the server with more than 3 workers. If you need more
> server instances, then create more containers and use a front balancer.

## Encoding

Apisearch is designed to be an easy multi platform search engine. One of the
main goals is to decrease your infrastructure complexity by adding a unique 
point of access for all your read-only operations from all of your devices. And
you know that some of these devices can be small ones consuming from 4G. This is
why response sizes matters. Shorter responses mean faster and smaller responses.

> Supported encoding methods are GZIP and Deflate

You can enable any of these encoding strategies by adding a simple HTTP header
in your request.

```
curl -XGET -H "Accept-Encoding: gzip" "http://localhost:80/v1/xxx"
```

If the plugin is enabled and working properly, you should see a response header
called `Content-Encoding`. If the content has been encoded properly, you will
find in this header the used method.

```
HTTP/1.1 200 OK
access-control-allow-origin: *
cache-control: max-age=0, private, s-maxage=0
date: Fri, 08 Mar 2019 16:40:26 GMT
content-type: application/json
content-encoding: gzip
X-Powered-By: React/alpha
Content-Length: 6393
Connection: close
```

You can use Deflate as well as an encoding method.

```
curl -XGET -H "Accept-Encoding: gzip" "http://localhost:80/v1/xxx"
HTTP/1.1 200 OK
access-control-allow-origin: *
cache-control: max-age=0, private, s-maxage=0
date: Fri, 08 Mar 2019 16:42:28 GMT
content-type: application/json
content-encoding: deflate
X-Powered-By: React/alpha
Content-Length: 6387
Connection: close
```

## Basic Tokens

By default, Apisearch server provide 3 basic tokens for each installation. Each
time you create a new server instance, by using direct configuration or by using
environment variables, you will be able to define 3 tokens that will be usable,
basically, for a normal server usage.

- GOD_TOKEN, for administration. Full access to everyhing
- READONLY_TOKEN, for read only operations. Usable only for items querying
. PING_TOKEN, for ping and health check. Specially designed for external
services that need to control the aliveness of the server (a balancer, a ping
service...)

These values are optional, and you can define them in configuration

```
apisearch_server:
    god_token: XXX
    readonly_token: YYY
    ping_token: ZZZ
```

of by using environment variables (recommended)

```
APISEARCH_GOD_TOKEN: XXX
APISEARCH_READONLY_TOKEN: YYY
APISEARCH_PING_TOKEN: ZZZ
```

## Result limitations

You can limit the number of results returned by the query endpoint in a hard
way. Even if the user that performs the query increase that number, this value
will override the custom one.

```
apisearch_server:
    limitations:
        number_of_results: 100
```

## Plugins
