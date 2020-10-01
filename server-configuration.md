# Server configuration

Apisearch server, as well as most of the plugins, can be configured completely
by using environment variables.

Apisearch works with a file called `.env` placed in the root of the project.
You might update some of these values with your own values (we don't setup
default values to prevent security issues). You will find an skeleton of the
file inside the root of the project with the name `.env.dist`.

This Apisearch configuration doesn't even start the Elasticsearch plugin by
default, so everything inside Apisearch is built on top of its plugin system.
Whereas is usually not the desired configuration (having Apisearch with no
search engine installed behind... seems weird, right?), you could need a simple
apisearch instance working without dependencies with the only purpose to expose
a working API.

```yaml
# Server configuration
APISEARCH_ENV=dev
APISEARCH_GOD_TOKEN=0e4d75ba-c640-44c1-a745-06ee51db4e93
APISEARCH_READONLY_TOKEN=410806ed-f2c2-8d22-96ea-7fb68026df34
APISEARCH_PING_TOKEN=6326d504-0a5f-f1ae-7344-8e70b75fcde9

APISEARCH_ENABLED_PLUGINS=admin
# APISEARCH_EVENTS_EXCHANGE=events
# APISEARCH_TOKENS_UPDATE_EXCHANGE=tokens_update
# APISEARCH_ASYNC_EVENTS_ENABLED=1

# AMQP_HOST=127.0.0.1
# AMQP_USER=guest
# AMQP_PASSWORD=guest
# AMQP_VHOST=/

# Elasticsearch plugin configuration
# 
# ELASTICSEARCH_HOST=127.0.0.1
# ELASTICSEARCH_PORT=9200
# ELASTICSEARCH_VERSION=7
# ELASTICSEARCH_REFRESH_ON_WRITE=1

# DBAL plugin configuration
# 
# DBAL_DRIVER=mysql
# DBAL_HOST=127.0.0.1
# DBAL_PORT=3306
# DBAL_USER=root
# DBAL_PASSWORD=root
# DBAL_DBNAME=apisearch
# DBAL_TOKENS_TABLE=tokens
# DBAL_INDEX_CONFIGS_TABLE=index_configs
# DBAL_USAGE_LINES_TABLE=usage_lines
# DBAL_METADATA_TABLE=metadata
# DBAL_INTERACTIONS_TABLE=interactions
# DBAL_SEARCHES_TABLE=searches
# DBAL_LOOP_PUSH_INTERVAL=60

# Redis plugin configuration
# 
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
# REDIS_DATABASE=/
# REDIS_PASSWORD=foo

# Logstash plugin configuration 
#
# LOGSTASH_REDIS_HOST=127.0.0.1
# LOGSTASH_REDIS_PORT=6379
# LOGSTASH_REDIS_DATABASE=/
# LOGSTASH_REDIS_PASSWORD=foo
# LOGSTASH_REDIS_KEY=logstash.apisearch
# LOGSTASH_REDIS_SERVICE=apisearch
```

Make sure you **update this values** before building your containers.
Once finished, then it's time to build and run your container.

## Docker image configuration

If you work with our distributed image, make sure you define these environment
variables in an inline mode. Remember to expose the port 8000 (this is our 
server interval used port)

```bash
docker run -it \
    -e "APISEARCH_GOD_TOKEN=0e4d75ba-c640-44c1-a745-06ee51db4e93" \
    -e "APISEARCH_READONLY_TOKEN=410806ed-f2c2-8d22-96ea-7fb68026df34" \
    -e "APISEARCH_PING_TOKEN=6326d504-0a5f-f1ae-7344-8e70b75fcde9" \
    -e "APISEARCH_ENABLED_PLUGINS=admin" \
    -p "8000:8000" \
    apisearchio/search-server:latest    
```