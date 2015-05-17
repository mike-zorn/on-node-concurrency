'use strict';

var http = require('http')
var url = require('url')
var multiply = require('bindings')('multiply')

function respond (res, result) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(result.toString())
}

module.exports = http.createServer(function (req, res) {
  var x = parseInt(url.parse(req.url, true).query.x, 10)
  var y = parseInt(url.parse(req.url, true).query.y, 10)

  if (!process.env.USE_C) {
    let result = 0
    for (let i = 0; i < y; i++) {
      result += x
    }
    respond(res, result)
  } else {
    multiply.multiply(x, y, function (err, result) {
      if (err) { process.emit('error', err) }
      respond(res, result)
    })
  }

})
