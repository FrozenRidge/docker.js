var async = require('async')
var request = require('request')
var resolve = require('url').resolve

var host

function listContainers(cb) {
  var url = resolve(host, "containers/ps")
  request({url: url, json: true}, function(err, res, json) {

    if (err) return cb(err, null)

    if (res.statusCode !== 200) {
      return cb("HTTP response code is " + res.statusCode + " not 200", json)
    }

    cb(null, json)
  })
}

function createContainer(opts, cb) {
  var url = resolve(host, "containers/create")

  request({url: url, json:opts, method:"POST"}, function(err, res, json) {
    if (err) return cb(err, null)
    if (res.statusCode !== 200) {
      return cb("HTTP response code is " + res.statusCode + " not 200", json)
    }

    cb(null, json)
  })

}

module.exports = function(opts) {

  host = "http://localhost:4243" || opts.host

  return {
    createContainer: createContainer,
    listContainers: listContainers,
  }

}
