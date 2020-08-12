const trianglify = require("trianglify")
const fs = require('fs')

module.exports.trianglify = (event, context, callback) => {
  const { height, width } = normalizeDimensions(event)
  const seed = normalizeSeed(event)

  const canvas = trianglify({
    height,
    width,
    seed,
  }).toCanvas()
  const result = canvas.toDataURL("image/png").split(',')[1]

  const response = {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Content-Type": "image/png"
    },
    body: result,
  };

  callback(null, response);
};

const DEFAULT_DIMENSIONS = { width: 500, height: 280 }
const WIDTH_MAX = 636
const HEIGHT_MAX = 358

function normalizeDimensions(event) {
  try {
    const dimensions = event.queryStringParameters.g
    const [widthStr, heightStr] = dimensions.split("x")
    const width = Math.min(parseInt(widthStr, 10), WIDTH_MAX)
    const height = Math.min(parseInt(heightStr, 10), HEIGHT_MAX)

    return { width, height }
  } catch(e) {
    return DEFAULT_DIMENSIONS
  }
}

function normalizeSeed(event) {
  return event.pathParameters.id
}
