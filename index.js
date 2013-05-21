var async = require('async')
var request = require('request')
var url = require('url')

function listContainers(host, cb) {
  var url = url.resolve(host, "containers/ps")
  request({url: url, json: true}, function(err, res, json) {

    if (err) return cb(err, null)

    if (res.statusCode !== 200) {
      return cb("HTTP response code is " + res.statusCode + " not 200", null)
    }

    cb(null, json)
  })
}

module.exports = function(opts) {

  host = "http://localhost:4243" || opts.host

  return {
    listContainers: listContainers,
  }

}