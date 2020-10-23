# Security plugin

Add some extra security to your system by adding some capabilities to your
tokens.

Apisearch is an online API designed to be available from what we can call the
entire internet. Of course, you can explicitly limit this access in a hard way
by using network rules or by making a hard use of tokens, but even in the most
limited scenario, your users will still use Apisearch as an API, and this can
always have negative implications.

This plugin offers your several ways of secure the server. Not only the data
that you may have inside your indices, but as well the way your final users 
access it.

## Installation

Installing a plugin is always an easy work. You can find more information in the
special [Enable a plugin](/plugins) documentation section. This plugin's short
format name is **security** and you can install it by using, for example, the
environment variable.

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="security"
```

## Configuration

The Security plugin uses Redis in order to store all the partial information
that needs for, for example, all the tokens limitation features. That means that
you should define an specific Redis connection for this plugin (even if the
connection credentials are shared across all other plugins, the server will only
create one single connection)

```
APISEARCH_GOD_TOKEN=xxx
APISEARCH_PING_TOKEN=xxx
APISEARCH_ENABLED_PLUGINS="security"
REDIS_SECURITY_HOST=localhost
REDIS_SECURITY_PORT=6379
REDIS_SECURITY_IS_CLUSTER=false
REDIS_SECURITY_DATABASE=
```

The only required are the host and the port.

## Token time limitation

How much time a distributed token will be valid? This is a good question if your
tokens are mostly distributed for third party customers or clients. You can sell
a 1 month read only token, or a 1 year license to full access to an specific
index. The value must be in seconds.

You can now define this information in the Token creation action. Let's see how.

<!-- tabs:start -->
#### ** PHP **
```php
new Token(
    new TokenUUID('12345'),
    new AppUUID('app123'),
    [], // All indices
    [], // All endpoints
    [], // All plugins
    60, // 60 seconds for TTL
    [
        'seconds_valid' => (3600 * 24 * 365), // 1 year
    ]
)
```

#### ** JSON **
```yaml
{
  "uuid": {
    "id": "12345"
  },
  "app_uuid": {
    "id": "app123"
  },
  "metadata": {
    "seconds_valid": 31536000
  }
}
```
<!-- tabs:end -->

After these seconds, the token will turn invalid and the server will start
returning 4XX values for this specific token.

## Referrers whitelist

If you want to control and restrict some referrers, you can add a referrers
whitelist in your token. This token will only be valid if the current request
actually matches one of these referrers. Otherwise, the plugin will consider
that the token is invalid.

<!-- tabs:start -->
#### ** PHP **
```php
new Token(
    new TokenUUID('12345'),
    new AppUUID('app123'),
    [], // All indices
    [], // All endpoints
    [], // All plugins
    60, // 60 seconds for TTL
    [
        'http_referrers' => [
            'google.com',
            'twitter.com',
        ]
    ]
);
```
#### ** JSON **
```yaml
{
  "uuid": {
    "id": "12345"
  },
  "app_uuid": {
    "id": "app123"
  },
  "metadata": {
    "http_referrers": [
      "google.com",
      "twitter.com"
    ]
  }
}
```
<!-- tabs:end -->

## Requests limit

You may create a new token with a limit set of requests per unit of time. For
example, only allowing the user to access the API 1 thousand times per hour. Or
for example setting a max requests per second. Or simply setting a finite number
of total requests.

This feature allow you to create these rules.

Let's check the format with some examples.

* 10/s - Maximum of 10 requests per second
* 100/i - Maximum of 100 requests per minute
* 1K/h - Maximum of 1000 requests per hour
* 10K/d - Maximum of 10 thousand requests per day
* 1M/m - Maximum of 1 million requests per month
* 1MM/h - Maximum of 1 billion requests per year
* 1M - Maximum of 1 million requests

Once exceeded the limit, the Token will be invalid until if valid again (next
unit of time). In case of finite requests, the token will turn invalid after the
number is reached.

You can add as many rules as you want. Each time the token is used, all rules
will be checked.

<!-- tabs:start -->
#### ** PHP **
```php
new Token(
    new TokenUUID('12345'),
    new AppUUID('app123'),
    [], // All indices
    [], // All endpoints
    [], // All plugins
    60, // 60 seconds for TTL
    [
        'requests_limit' => [
            '10/s',
            '1MM',
        ]
    ]
);
```

#### ** JSON **
```yaml
{
  "uuid": {
    "id": "12345"
  },
  "app_uuid": {
    "id": "app123"
  },
  "metadata": {
    "requests_limit": [
      "10/s",
      "1MM"
    ]
  }
}
```
<!-- tabs:end -->

## Restricted / Allowed fields

You can secure some fields as well. For example if your index contains private
fields only returnable by some of premium tokens. In that case, you can allow
or exclude fields in a very simple syntax.

The `restricted_fields` will make desired fields impossible to get by the token.
This means that even if you get all fields or some specific fields, these
defined will never be part of the result.

The `allowed_fields` is a way to do exactly the same but starting from an empty
array. Defining only these fields you will give permissions **only** to these
fields.

<!-- tabs:start -->
#### ** PHP **
```php
new Token(
    new TokenUUID('12345'),
    new AppUUID('app123'),
    [], // All indices
    [], // All endpoints
    [], // All plugins
    60, // 60 seconds for TTL
    [
        'restricted_fields' => [
            'metadata.private_field',
            'indexed_metadata.another_private_field',
        ],
        'allowed_fields' => [
            'metadata.important_field',
        ]
    ]
);
```

#### ** JSON **
```yaml
{
  "uuid": {
    "id": "12345"
  },
  "app_uuid": {
    "id": "app123"
  },
  "metadata": {
    "restricted_fields": [
        "metadata.private_field",
        "indexed_metadata.another_private_field"
    ]
  }
}
```
<!-- tabs:end -->