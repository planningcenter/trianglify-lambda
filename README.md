# Trianglify Lambda

This is a simple lambda function that returns a generated trianglify images.

### Usage

To run, invoke the function using the data (defaults listed):

```
{
  name: "large",
  width: 500,
  height: 280
}
```

You will need environmental variables for:

```
S3_BUCKET
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

### Deploying

The lambda is built using serverless so you can easily deploy this using [serverless's documentation](https://www.serverless.com/framework/docs/providers/aws/guide/deploying/)
