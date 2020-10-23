## Index Items

By using this endpoint you will be able to add some items in your index.
Here some related model objects you may know.

- [Model - Item](/model.html#item)
- [Model - ItemUUID](/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1_put_items
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/items
- Verb - **PUT**
- Body - An array of [Item](/model.html#item) instances as array
- Headers
    - Apisearch-token-id: "{{ token_id }}"
    - Content-Type: "application/json"

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/items" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    [{
        "uuid": {
            "id": "1",
            "type": "product"
        },
        "metadata": {
            "title": "My product"
        },
        "searchable_metadata": {
            "title": "My product"
        }
    },
    {
        "uuid": {
            "id": "2",
            "type": "product"
        },
        "metadata": {
            "title": "Another product"
        },
        "searchable_metadata": {
            "title": "Another product"
        }
    }]
'
```

## Delete Items

By using this endpoint you will be able to delete some existing items from your
index. Here some related model objects you may know.

- [Model - Item](/model.html#item)
- [Model - ItemUUID](/model.html#itemuuid)

This is the endpoint reference

- Endpoint name - v1_delete_items
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/items
- Verb - **DELETE**
- Body - An array of [ItemUUID](/model.html#itemuuid) instances as array
- Headers
    - Apisearch-token-id: "{{ token_id }}"
    - Content-Type: "application/json"

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/items" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    [{
        "id": "1",
        "type": "product"
    },
    {
        "id": "2",
        "type": "product"
    }]
'
```

## Update Items by Query

By using this endpoint you will be able to update some items from your index
without needing to index them all once again. 

This is the endpoint reference

- Endpoint name - v1_update_items_by_query
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/items/update-by-query
- Verb - **PUT**
- Body 
    - query: An instance of [Query](/model.html#query) as array
    - changes: An instance of [Changes](/model.html#changes) as array
- Headers
    - Apisearch-token-id: "{{ token_id }}"
    - Content-Type: "application/json"
    
By using this endpoint you will always work with two objects.

With the first one, a [Query](/model.html#query) instance, you
will be able to select all these Items that you want to change at a time. This
parameter key will be `query`. With the second one, a 
[Changes](/model.html#changes) instance, you will be able to apply 
one or more changes to the result of the previous query. This parameter key will 
be `changes`.

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X PUT "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/items/update-by-query" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "query": {
            "q": ""
        }
        "changes": [
            {
                "field": "new_field",
                "type": 1,
                "value": "new_value"
            },
            {
                "field": "another_field",
                "type": 1,
                "value": "new_value"
            },
            {
                "field": "counter",
                "type": 4,
                "value": "counter"
            }
        ]
    }
'
```

## Delete Items by Query

By using this endpoint you will be able to delete some items from your index,
using a Query object for they selection.

This is the endpoint reference

- Endpoint name - v1_delete_items_by_query
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**/items/by-query
- Verb - **DELETE**
- Body 
    - query: An instance of [Query](/model.html#query) as array
- Headers
    - Apisearch-token-id: "{{ token_id }}"
    - Content-Type: "application/json"
    
By using this endpoint you will always work with one object.

With this unique parameter, a [Query](/model.html#query) instance, you
will be able to select all these Items that you want to change at a time. This
parameter key will be `query`.

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

```bash
curl -X DELETE "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}/items/by-query" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "query": {
            "q": "items to delete if match"
        }
    }
'
```