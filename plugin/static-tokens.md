# Static Tokens plugin

Define static tokens in your Apisearch application by using a single `token.yml`
file in the root of the project. These tokens will be immutable and static, and
will not be enabled or disabled by any circumstance.

Most of the projects using search engines use tokens for their own usage, and
not for external integrations (third party clients, for example). In that cases
where tokens become something really static, there's no sense of adding an extra
processing layer for them, like Redis or any other key value storage plugin.

In order to make it simple, you can simply set a collection of tokens that will
be used statically by the server.

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="static_tokens"
```

## Configuration

Define your tokens here by using the `yml` format as any other configuration
part. You can use another file than the main `app.yml` file, like the previous
referenced `tokens.yml`, or any other you prefer. By convention, use
`tokens.yml` in the root of the project.

You can add the import line.

```yml
config:
    imports:
        - { resource: "@ApisearchServerBundle/tokens.yml", ignore_errors: true }
```

And start defining your own tokens there. Use the main 
[Model - Token](/model.html#token) documentation page to know what any token is
composed by, and use the composed versions when defining UUIDs.

Let's see an example

```yml
apisearch_plugin_static_tokens:
    tokens:
        my-token:
            uuid: "my-token"
            app_uuid: "xxx"
            indices:
                - "yyy"
            endpoints:
                - "v1_query"
                - "v1_query_all_indices"
```

In that example, you enable a new token with UUID `my-token` that will allow you
to work with App `xxx` and with the Index `yyy`. Furthermore, this token will
have the restriction of accessing, only, in query endpoints.

You can define more extended tokens configuration, like forcing a query to be
used when the token is used.


```yml
apisearch_plugin_static_tokens:
    tokens:
        my-token:
            uuid: "my-token"
            app_uuid: "xxx"
            indices:
                - "yyy"
            endpoints:
                - "v1_query"
                - "v1_query_all_indices"
            metadata:
                force_query:
                    size: 10
                    filters:
                        issue_id:
                            field: "indexed_metadata.issue_id"
                            values: ["{{ app_id }}"]
```

In that case, you will automatically force the query done by this token to
return 10 elements and apply this filter. Check the 
[Model - Token](/model.html#token) documentation section to know a little bit
more how Tokens can be defined properly.