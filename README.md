# Guesty batch service

Allows user to modify huge amount of data on 3th party services using only single endpoint.

## Required System Dependencies

* NodeJS 16.x
* npm 8+

## Installing Project Dependencies

```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```


## Batch request example

For using this endpoint you need to send POST request on url `/batch` (e.g. `http://localhost:300/batch`) with request body:
```
{
    "endpoint": {
        "url": "https://virtserver.swaggerhub.com/Guesty/Users/1.0.0/user/{userId}", // endpoint url for data modification
        "verb": "GET" // request method
    },
    "payload": [ 
        {
            "parameters": { // params that will raplace placeholders in request url (e.g. {usedId})
                "userId": 14
            },
            "requestBody": { // data that will be sent as request body
                "age": 30
            }
        },
    ]
}
```

as a response you should get list of response statuses for each item you've been working with:
```
[
    {
        "status": 200 // response status code
    },
    {
        "status": 404
    },
    {
        "status": 201
    }
]
```
or you can also get 503 error if service you are calling is unavailable.