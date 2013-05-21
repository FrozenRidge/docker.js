var docker = require('./index')
var expect = require('chai').expect
var nock = require('nock')

var host = "http://localhost:4243"

describe("docker.js", function() {

  describe("#containers", function() {

    describe("#listContainers", function() {

      var containers = [
        {
         "Id": "8dfafdbc3a40",
         "Image": "base:latest",
         "Command": "echo 1",
         "Created": 1367854155,
         "Status": "Exit 0"
        },
        {
         "Id": "9cd87474be90",
         "Image": "base:latest",
         "Command": "echo 222222",
         "Created": 1367854155,
         "Status": "Exit 0"
        },
      ]

      it("should list containers", function(done) {
        var scope = nock(host).get('/containers/ps').reply(200, containers)

        function gotContainers(err, c) {
          expect(err).to.be.null
          expect(c).to.eql(containers)
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)

      })

      it("should error on non-200 from server", function(done) {
        var scope = nock(host).get('/containers/ps').reply(500, [])

        function gotContainers(err, c) {
          expect(err).to.exist
          expect(c).to.be.null
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)

      })

    })

  })
})
