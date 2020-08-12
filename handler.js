const trianglify = require("trianglify")
const fs = require('fs')
const S3 = require("aws-sdk/clients/s3")

const s3 = new S3()

const DEFAULT_DIMENSIONS = { width: 500, height: 280 }
const IMAGE_COUNT = 1000

module.exports.trianglify = (event, context, callback) => {
  let uploads = []

  for(let seed = 1; seed <= IMAGE_COUNT; seed++) {
    const canvas = trianglify({
      height: event.height || 500,
      width: event.width || 280,
      seed,
    }).toCanvas()
    const image = canvas.toDataURL("image/png").split(',')[1]

    uploads.push(s3.putObject({ Bucket: process.env.S3_BUCKET, Key: `${seed}-${event.name || "large"}.png`, Body: image }).promise())
  }

  Promise.all(uploads)
    .then(res => {
      callback(null, res);
    }).catch(err => {
      callback(err, null);
    });
};
