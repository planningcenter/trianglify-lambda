# Trianglify Lambda

This is a simple lambda function that returns a generated trianglify images.

### Usage

Once the function is running (see Deploying or Running locally), you can make requests to the lambda endpoint via a request like this:

```
/trianglify/MY_SEED?g=WIDTHxHEIGHT

OR WITH FAKE DATA

/trianglify/123?g=640x480
```

The g property is not required, but the seed is.

### Deploying

The lambda is built using serverless so you can easily deploy this using [serverless's documentation](https://www.serverless.com/framework/docs/providers/aws/guide/deploying/)

### Running locally

You can test this out locally using the command:

```
sls offline
```
