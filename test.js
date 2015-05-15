var async = require('async')
var curry = require('curry')
var test = require('tape')
var http = require('http')
var server = require('./index')

var port

var sendRequest = curry(function (x, y, t, cb) {
  var time = process.hrtime()
  var req = http.request({
    path: '/?x=' + x + '&y=' + y,
    port: port
  }, function (res) {
    res.on('data', function (data) {
      t.equal(x * y, parseInt(data.toString(), 10))
    })
    res.on('error', cb)
    res.on('end', function () {
      t.comment('done in ' + process.hrtime(time)[0] + ' seconds')
      cb()
    })
  })
  req.end()
})

test('setup', function (t) {
  t.plan(2)

  server.listen(0, function (err) {
    t.error(err)
    t.ok(port = server.address().port)
  })
})

test('2 x 100: single request', function (t) {
  sendRequest(2, 100, t, t.end)
})

test('2 x 2500000000: single request', function (t) {
  sendRequest(2, 2500000000, t, t.end)
})

test('2 x 2500000000: 3 requests', function (t) {
  async.parallel([
    sendRequest(2, 2500000000, t),
    sendRequest(2, 2500000000, t),
    sendRequest(2, 2500000000, t)
  ], t.end)
})

test('teardown', function (t) {
  t.plan(1)
  server.close(function (err) {
    t.error(err)
  })
})
