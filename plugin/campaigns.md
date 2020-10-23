# Campaigns plugin

You might want to create some specific boosting, depending on some variables,
like the query text the user is searching by, the filters this user have applied
or a range of dates.

With this plugin, you will be able to manage some campaigns for your indices.
The fast name of the plugin is `campaign`. You can use it for enabling it like
it's explained here - [Enable this plugin](enable-a-plugin.md)

- [Enable this plugin](enable-a-plugin.md)
- [Campaign Mode](#campaign-model)
    - [Matching a campaign](#matching-a-campaign)
    - [Boosting in a query](#boosting-in-a-query)
- [HTTP Reference](#http-reference)
    - [Put Campaign](#put-campaign)
    - [Get Campaign](#get-campaign)
    - [Get Campaigns](#get-campaigns)
    - [Delete Campaign](#delete-campaign)
    - [Delete Campaigns](#delete-campaigns)

## Campaign model

This plugin enables some HTTP endpoints described in this documentation, and
exposes a tiny Campaign model. Let's see what a campaign is under the scope of
Apisearch

```yml
campaign:
    uid:
        id: string
    from: timestamp|null
    to: timestamp|null
    index_uuid: IndexUUID
    match_criteria_mode: string ['must_all', 'at_least_one']
    match_criteria:
        -
            type: string ['exact', 'similar', 'includes_exact', 'includes_similar']
            text: string
            filters: Filter[]
    boosting_filters:
        -
            filter: Filter
            factor: float
            matching_main_query: boolean
```

Each campaign defines two basic application phases. The matching and the
boosting one.

### Matching a campaign

Once a campaign it's introduced, you can specifically define when this campaign
will be applied. Under what circumstances this campaign will modify the original
query, adding extra search logic.

#### By indexUUID

Of course, each campaign belongs to an index. Only if the search it's executed
under this index, your campaign will be able to be selected as valid. Otherwise
will be ignored.

#### Time range

You can enable or disable campaigns depending on the timestamp a query is done.
For example, we can create a campaign only active on December and January. We
would configure it by adding the 1st of December timestamp into the field `from`
and the end of January into the field `to`. These fields can be empty as well,
meaning no limit in both cases.

#### Match criteria

Once your campaign matches the time range, and the indexUUID filter, then you
can create a set of scenario filters related to the emitted query. You can add
several of them, and if the setting `match_criteria_mode` value equals 
*match_all*, the campaign only will be selected if all Filters match. On
the other hand, if the setting's value is `at_least_one`, if one filter at least
matches, then the Campaign will be considered valid. 

Default `match_criteria_mode` is *match_all*.

#### Query Text Match Criteria

The first match criteria consists in matching the user's query text. You will
find 4 simple types you can do such work.

- exact: Match the exact query by the user. Case insensitive.
- similar: Match a similar query by the user. Using `levenshtein` algorithm with
a deviation of 1.
- includes_exact: If the query have multiple words, matches if at least one is
exact the defined one.
- includes_exact: If the query have multiple words, matches if at least one is
similar the defined one. Using `levenshtein` algorithm with a deviation of 1.

#### Filter Match Criteria

You can define a criteria instance with an array of Filters. Check how a filter
looks like at our [model documentation](../code-reference/model.md#filter).
Having multiple Filter rows means that all must match in order to consider the
Criteria matched, so if you want to match by two possible filters, then consider
creating multiple match criteria elements, having one filter each and using
the value *at_least_one* in the flag `match_criteria_mode`

#### Mixed Match Criteria

As you can see in the format reference, a match criteria can have at the same
time enough information a query text matching criteria, and an array of filters,
so that means that you can have both at the same time, assuming that the
criteria will match only if all elements match individually. See an example.

```yml
match_criteria:
    -
        type: exact
        text: engonga
        filters:
            - // Filter1
            - // Filter2
```

This example will match only if the query is exact *engonga* and both filters
match with the query.

### Boosting in a query

Once one or several campaigns are matched, then there's a boosting process in
the received query. Original query format is not modified, by the plugin will
internally add some score_strategy elements that will raise som elements
depending on your configuration.

Each boosting filter is applied isolatedly, so you could have inconsistencies in
your results if two campaigns match at the same time and affect the same group
of elements.

```yml
boosting_filters:
    -
        filter: Filter
        factor: float
        matching_main_query: boolean
```

Each element of the array have a [Filter](../code-reference/model.md#filter)
instance, a `factor` that will boost all elements matched by the filter, and a 
very specific flag called `matching_main_query`.

If `matching_main_query` is true, then the boosting will only be applied to
these items that are part of the final result set of items. That means that in
order to consider an Item part of the result must match the original query and
set of filters. This block will only boost it. If the elements is not part of
the result set, then the item will neither be boosted nor returned.

If `matching_main_query` is false, then the boosting will take the result set of
items that match the defined filter and will consider them all as part of the
global result set, no matter what the query is.

By default, `matching_main_query` is true.

## HTTP Reference

You can manage your campaigns by using these server endpoints.

## Put Campaign

By using this endpoint you will be able to store a campaign. If the campaign 
does exist, it will be overwritten. Otherwise, will be created.

This is the endpoint reference

- Endpoint name - v1_put_campaign
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/campaign/**{{ campaign_id }}**
- Verb - **PUT**
- Body - An instance of [Campaign](#campaign-model) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are show.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/campaigns/{{ campaign_id }}" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "match_criteria_mode": "at_least_one",
        "match_criteria": [
            {
                "type": "exact",
                "text": "shirt"
            }
        ],
        "boosting_filters": [
            {
                "filter": {
                    "field": "color".
                    "values": ["red"]
                },
                "factor": 2,
                "matching_main_query": false
            }
        ]
    }
'
```

## Get Campaign

By using this endpoint you will be able to get a campaign. If the resource
exists, you will receive a campaign instance as an array. Otherwise you will
receive a `404 not found`

This is the endpoint reference

- Endpoint name - v1_get_campaign
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/campaigns/**{{ campaign_id }}**
- Verb - **GET**
- Headers
    - Apisearch-token-id: "{{ token_id }}" 

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/campaigns/{{ campaign_id }}" \
    -H "Apisearch-token-id: {{ token }}"
```

## Get Campaigns

By using this endpoint you will be able to get your index campaigns. The 
endpoint will always return an array of campaign objects as arrays.

This is the endpoint reference

- Endpoint name - v1_get_campaigns
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/campaigns
- Verb - **GET**
- Headers
    - Apisearch-token-id: "{{ token_id }}" 

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/campaigns" \
    -H "Apisearch-token-id: {{ token }}"
```

## Delete Campaign

By using this endpoint you will be able to delete an specific campaign. If the
resource exists, will be deleted. Otherwise, you'll receive a `404 not found`.

This is the endpoint reference

- Endpoint name - v1_delete_campaign
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/campaigns/**{{ campaign_id }}**
- Verb - **DELETE**
- Headers
    - Apisearch-token-id: "{{ token_id }}" 

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/campaigns/{{ campaign_id }}" \
    -H "Apisearch-token-id: {{ token }}"
```

## Delete Campaigns

By using this endpoint you will be able to delete **all** your index campaigns.
Make sure you use this endpoint from the responsible side of your life.

This is the endpoint reference

- Endpoint name - v1_delete_campaigns
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/campaigns
- Verb - **DELETE**
- Headers
    - Apisearch-token-id: "{{ token_id }}" 

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/campaigns" \
    -H "Apisearch-token-id: {{ token }}"
```