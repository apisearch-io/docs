# Enable a plugin

By default, Apisearch comes with only the basic plugins. That means that, if you
don't configure your installation, only the Elasticsearch and Redis plugins will
be enabled.

There are many ways to enable plugins in Apisearch.

## Enable plugins in your app.yml

A plugin is a simple Symfony Bundle, so enabling a plugin means enabling it
inside the Symfony kernel.

We use a simple `app.yml` configuration file in order to create the application,
so, if you check the first part of the file you will find an array of enabled
plugins.

Add yours there.

```yml
bundles:
    - Apisearch\Server\ApisearchServerBundle
    - Apisearch\Server\ApisearchPluginsBundle
    - My\Own\Plugin\Namespace
    - My\Other\Plugin\Namespace
```

## Enable plugins in your .env file

If you're using the `.env` to configure your installation, you can manage your
plugins by using the variable `APISEARCH_ENABLED_PLUGINS` as a concatenation of
namespaces, splitted by a simple comma.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="My\Own\Plugin\Namespace, My\Other\Plugin\Namespace"
```

You can use a better format in order to make sure your environment file is easy
to read and understand.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="
    My\Own\Plugin\Namespace,
    My\Other\Plugin\Namespace
"
```

Or even a short format if the plugin is placed in the main server distribution.
Each plugin will show its own short format name.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="plugin1, plugin2"
```

## Enable plugins in your docker run

If you use docker and you need to enable specific plugins when deploying a
container, then you can pass these environment variables in the docker run

```bash
docker run -d \
    --name "apisearch_server" \
    --link "apisearch_redis" \
    --link "apisearch_elasticsearch" \
    -e "APISEARCH_ENABLED_PLUGINS=My\Own\Plugin\Namespace, My\Other\Plugin\Namespace"
    apisearch/server/new-relic
```