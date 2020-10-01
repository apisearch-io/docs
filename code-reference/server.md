# Server

In this chapter we will talk about the Apisearch server. How to install it, how
to configure it and all the multiples ways it can properly work, depending on
the user needs.

## Architecture

Apisearch uses the DriftPHP Command Bus. The whole project is built on top of 
CQRS architecture and philosophy, using Command or Queries per each use case,
and allowing, for example, all plugins to add middleware classes and listening
only some commands or queries. 

This architecture is quite effective, and has allowed us to extend the project
as much as we have wanted in a plugins way, letting the core of the project as
it is, and locking it for future features.

The whole server is built on top of ReactPHP and DriftPHP, so all infrastructure
actions have been solved by using ReactPHP compatible libraries. It is important
not to perform blocking operations, both for external HTTP calls, like Redis or
Databases, and for disk accesses.

## HTTP Routes

The server exposes a set of http routes, each one of them documented properly
under the [HTTP Reference](http-reference.html) chapter. In order to provide a
basic schema about what kind of urls you will find here, this is the basic
routing table exposed by Symfony.

```
--------------------------------------------------- ---------- -------- ------ ------------------------------------------------------- 
 Name                                                Method     Scheme   Host   Path                                                   
--------------------------------------------------- ---------- -------- ------ ------------------------------------------------------- 
apisearch_v1_put_token                              PUT        ANY      ANY    /v1/{app_id}/tokens/{token_id}                         
apisearch_v1_delete_token                           DELETE     ANY      ANY    /v1/{app_id}/tokens/{token_id}                         
apisearch_v1_get_tokens                             GET        ANY      ANY    /v1/{app_id}/tokens                                    
apisearch_v1_delete_tokens                          DELETE     ANY      ANY    /v1/{app_id}/tokens                                    
apisearch_v1_get_indices                            GET        ANY      ANY    /v1/{app_id}/indices                                   
apisearch_v1_create_index                           PUT        ANY      ANY    /v1/{app_id}/indices/{index_id}                        
apisearch_v1_delete_index                           DELETE     ANY      ANY    /v1/{app_id}/indices/{index_id}                        
apisearch_v1_reset_index                            PUT|POST   ANY      ANY    /v1/{app_id}/indices/{index_id}/reset                  
apisearch_v1_configure_index                        PUT|POST   ANY      ANY    /v1/{app_id}/indices/{index_id}/configure              
apisearch_v1_check_index                            HEAD       ANY      ANY    /v1/{app_id}/indices/{index_id}                        
apisearch_v1_export_index                           GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/export                 
apisearch_v1_import_index_by_feed                   PUT        ANY      ANY    /v1/{app_id}/indices/{index_id}/import/by-feed         
apisearch_v1_import_index_by_stream                 PUT        ANY      ANY    /v1/{app_id}/indices/{index_id}/import/by-stream       
apisearch_v1_put_items                              PUT        ANY      ANY    /v1/{app_id}/indices/{index_id}/items                  
apisearch_v1_update_items_by_query                  PUT|POST   ANY      ANY    /v1/{app_id}/indices/{index_id}/items/update-by-query  
apisearch_v1_delete_items                           DELETE     ANY      ANY    /v1/{app_id}/indices/{index_id}/items                  
apisearch_v1_delete_items_by_query                  DELETE     ANY      ANY    /v1/{app_id}/indices/{index_id}/items/by-query         
apisearch_v1_get_usage                              GET        ANY      ANY    /v1/{app_id}/usage                                     
apisearch_v1_get_usage_per_day                      GET        ANY      ANY    /v1/{app_id}/usage/per-day                             
apisearch_v1_get_index_usage                        GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/usage                  
apisearch_v1_get_index_usage_per_day                GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/usage/per-day          
apisearch_v1_get_usage_preflight                    OPTIONS    ANY      ANY    /v1/{app_id}/usage                                     
apisearch_v1_get_usage_per_day_preflight            OPTIONS    ANY      ANY    /v1/{app_id}/usage/per-day                             
apisearch_v1_get_index_usage_preflight              OPTIONS    ANY      ANY    /v1/{app_id}/indices/{index_id}/usage                  
apisearch_v1_get_index_usage_per_day_preflight      OPTIONS    ANY      ANY    /v1/{app_id}/indices/{index_id}/usage/per-day          
apisearch_v1_query                                  GET        ANY      ANY    /v1/{app_id}/indices/{index_id}                        
apisearch_v1_query_all_indices                      GET        ANY      ANY    /v1/{app_id}                                           
apisearch_v1_query_preflight                        OPTIONS    ANY      ANY    /v1/{app_id}/indices/{index_id}                        
apisearch_v1_query_all_indices_preflight            OPTIONS    ANY      ANY    /v1/{app_id}                                           
apisearch_v1_post_click                             POST       ANY      ANY    /v1/{app_id}/indices/{index_id}/items/{item_id}/click  
apisearch_v1_post_click_preflight                   OPTIONS    ANY      ANY    /v1/{app_id}/indices/{index_id}/items/{item_id}/click  
apisearch_v1_get_interactions                       GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/interactions           
apisearch_v1_get_interactions_all_indices           GET        ANY      ANY    /v1/{app_id}/interactions                              
apisearch_v1_get_interactions_per_day               GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/interactions/per-day   
apisearch_v1_get_interactions_all_indices_per_day   GET        ANY      ANY    /v1/{app_id}/interactions/per-day                      
apisearch_v1_get_top_clicks                         GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/top-clicks             
apisearch_v1_get_top_clicks_all_indices             GET        ANY      ANY    /v1/{app_id}/top-clicks                                
apisearch_v1_get_searches                           GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/searches               
apisearch_v1_get_searches_all_indices               GET        ANY      ANY    /v1/{app_id}/searches                                  
apisearch_v1_get_searches_per_day                   GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/searches/per-day       
apisearch_v1_get_searches_all_indices_per_day       GET        ANY      ANY    /v1/{app_id}/searches/per-day                          
apisearch_v1_get_top_searches                       GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/top-searches           
apisearch_v1_get_top_searches_all_indices           GET        ANY      ANY    /v1/{app_id}/top-searches                              
apisearch_v1_get_metrics                            GET        ANY      ANY    /v1/{app_id}/indices/{index_id}/metrics                
apisearch_v1_get_metrics_all_indices                GET        ANY      ANY    /v1/{app_id}/metrics                                   
apisearch_v1_get_metrics_preflight                  OPTIONS    ANY      ANY    /v1/{app_id}/indices/{index_id}/metrics                
apisearch_v1_get_metrics_all_indices_preflight      OPTIONS    ANY      ANY    /v1/{app_id}/metrics                                   
apisearch_check_health                              GET        ANY      ANY    /health                                                
apisearch_ping                                      HEAD       ANY      ANY    /                                                      
apisearch_admin_dispatch_imperative_event           POST       ANY      ANY    /admin/dispatch-imperative-event/{eventName}           
apisearch_admin_get_apps                            GET        ANY      ANY    /admin/apps                                            
apisearch_admin_get_tokens                          GET        ANY      ANY    /admin/tokens                                          
apisearch_admin_get_usage                           GET        ANY      ANY    /admin/usage                                           
apisearch_admin_get_usage_per_day                   GET        ANY      ANY    /admin/usage/per-day                                   
apisearch_admin_optimize_usage_lines                PUT        ANY      ANY    /admin/usage/optimize                                     
------------------------------------ -------- -------- ------ -------------------------------------------------------
```

## The HTTP server

Apisearch doesn't need any Apache nor Nginx to work, saving this way many 
milliseconds of performance when serving query requests. Apisearch is built on
top of a PHP framework called [DriftPHP](https://github.com/driftphp) and
[ReactPHP](https://reactphp.org/) in order to manage multiple requests at the
same time, concurrently, and in a non blocking way.

Once composer has installed all the dependencies, you will find two different
ways of making your server start working. We strongly recommend to use, for
development, the watch one. It will reload the whole server as soon as you make
changes in your codebase.

```
php vendor/bin/server watch 0.0.0.0:8200
```

This is a simple PHP script based on ReactPHP that will create a simple server,
listening your defined port. You can stop the server by using `Ctrl+C` and start
the process again as many times as you need.

On the other hand, in production, we strongly recommend you using this

```
php vendor/bin/server run 0.0.0.0:8200
```

In this mode, as soon as you want your server to get last changes, you'll need
to stop the server using `Ctrl+C` and start the process again.

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

You can limit the number of results returned by the query endpoint. Even if the
user that performs the query increase that number, this value will always
override the custom one.

```
apisearch_server:
    limitations:
        number_of_results: 100
```

## Crontab

You might have to work with some custom (or existing) plugin with some regular
actions, like some checks or some pushes. A regular way of solving this need is
by providing some extra endpoints inside Apisearch, defined by the plugin
itself and calling them from the outside, forcing something to happen in a
regular frequency.

This could work, but is not easy, and is would not follow what we call good
practices. Different versions would mean instant deployments in different
places, what means that the plugin would lose that isolation we are always
looking for.

In order to solve that, Apisearch has a command with one single mission: to
collect Crontab lines among all plugins.

Check the [plugins](plugins.html) documentation, and check how to create
middlewares for some commands and queries. You will notice that there is one
query called `GetCrontab`. Add there you crontab lines, and call your local
commands.

You can generate the crontab file by calling this server command.

```
php bin/console apisearch-server:generate-crontab --env=prod
```