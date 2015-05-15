var http = require('http')
var url = require('url')

module.exports = http.createServer(function (req, res) {
  var x = parseInt(url.parse(req.url, true).query.x, 10)
  var y = parseInt(url.parse(req.url, true).query.y, 10)

  var result = 0
  for (var i = 0; i < y; i++) {
    result += x
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(result.toString())
})
