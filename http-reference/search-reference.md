## Query

By using this endpoint you will make a simple query to one or several indices in
an existing app. Here some related model objects you may know.

- [Model - Query](/model.html#query)
- [Client Reference - Query creation](/client-reference/query-creation.html)

This is the endpoint reference

- Endpoint name - v1_query
- Path - /v1/**{{ app_id }}**/indices/**{{ index_id }}**
- Verb - **GET**
- Body - An instance of [Query](/model.html#query) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"
    
> Even if this endpoint has GET as verb, we can add some json body in order to
> make much simpler our query builds. We can pass the queries as well by
> json_encoding the query and passing it as a query parameter with key `query`.

> Token can be passed as well, instead of a header, by using the query parameter
> *token*

You can try this endpoint by using this curl snippet. As you can see, you should
replace the placeholders with your own data. In order to make sure no one
has a default values in their installation, and creating a vulnerability, no
default values are shown.

All these three options will be equal, having different ways of passing the
query object and the token.

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "q": "house"
    }
    '
```

> Url encoding the value json *{"q": "house"}* you have *{%22q%22:%22house%22}*

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}?query={%22q%22:%22house%22}" \
    -H "Apisearch-token-id: {{ token }}"
```

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}/indices/{{ index_id }}?query={%22q%22:%22house%22}&token={{ token }}"
```

This endpoint will return a [Result](/model.html#result) object.

## Query to all app indices

If you want to query over all app indices, then you can simply ask for the index
`*`, or use the reduced endpoint for that

- Endpoint name - v1_query
- Path - /v1/**{{ app_id }}**
- Verb - **GET**
- Body - An instance of [Query](/model.html#query) as array.
- Headers
    - Apisearch-token-id: "{{ token_id }}" 
    - Content-Type: "application/json"
    
And a simple example

```bash
curl -X GET "http://localhost:8100/v1/{{ app_id }}" \
    -H "Content-Type: application/json" \
    -H "Apisearch-token-id: {{ token }}" \
    -d'
    {
        "q": "house"
    }
    '
```