const trianglify = require("trianglify")
const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

const s3 = new S3()

const DEFAULT_DIMENSIONS = { width: 500, height: 280 }
const DEFAULT_IMAGE_COUNT = 10
const DEFAULT_HEIGHT = 280
const DEFAULT_WIDTH = 500
const DEFAULT_NAME = "large"

module.exports.trianglify = (event, context, callback) => {
  let uploads = []

  for(let seed = 1; seed <= (event.count || DEFAULT_IMAGE_COUNT); seed++) {
    const canvas = trianglify({
      height: event.height || DEFAULT_HEIGHT,
      width: event.width || DEFAULT_WIDTH,
      seed,
    }).toCanvas()
    const image = canvas.toDataURL("image/png").split(',')[1]

    uploads.push(
      s3.putObject({
        Bucket: process.env.S3_BUCKET,
        Key: `${seed}-${event.name || DEFAULT_NAME}.png`,
        ContentType: "image/png",
        ContentEncoding: 'base64',
        Body: image
      }).promise()
    )
  }

  Promise.all(uploads)
    .then(res => {
      callback(null, res);
    }).catch(err => {
      callback(err, null);
    });
};
