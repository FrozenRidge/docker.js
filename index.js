var async = require('async')
var request = require('request')
var resolve = require('url').resolve

var host

function genFunction(o) {

  var path = o.path
  var method = o.method
  var statusCodes = o.codes

  function verifyStatus(s) {
    if (s in statusCodes) {
      return {status: statusCodes[s] === true, msg: statusCodes[s] }
    }

    return {status: false, msg:null}
  }

  function checkStatus(err, res, json, cb) {
        if (err) return cb(err, null)
        var s = verifyStatus(res.statusCode.toString())
        if (!s.status) {
          var msg = "HTTP response code is " + res.statusCode +
            " which indicates an error"
          if (s.msg) msg += ": " + s.msg
          return cb(msg, json)
        }
        cb(null, json)
  }

  // Supported signatures:
  // function("id", cb)
  // function({JSON options}, cb)
  // function(cb)
  return function(opts, id, cb) {
    // Signature: function(cb)
    if (typeof(opts) === 'function') {
      cb = opts
      var url = resolve(host, path)
      request({url: url, json: true, method:method}, function(err, res, json) {
        return checkStatus(err, res, json, cb)
      })
    }

    // Signature: function(opts, cb)
    else if (typeof(opts) === 'object' && typeof(id) === 'function') {
      cb = id
      var url = resolve(host, path)
      request({url: url, json: opts, method: method}, function(err, res, json) {
        return checkStatus(err, res, json, cb)
      })
    }

    // Signature: function(id, cb)
    else if (typeof(opts) === 'string' && typeof(id) === 'function') {
      id = opts
      cb = id
      var url = resolve(host, path, id)
      request({url: url, method:method}, function(err, res, json) {
        return checkStatus(err, res, json, cb)
      })
    }
  }
}

module.exports = function(opts) {

  host = "http://localhost:4243" || opts.host

  return {
    listContainers: genFunction({
      path: '/containers/ps',
      method: 'GET',
      codes: {200:true, 400:"bad parameter", 500:"server error"}
    }),
    createContainer: genFunction({ 
      path: '/containers/create',
      method: 'POST',
      codes: {201:true, 404:"no such container", 500:"server error"}
    }),
  }

}
