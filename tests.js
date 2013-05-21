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

      before(function() {
        var scope = nock(host).get('/containers/ps').
          reply(200, containers)
      })

      after(function() {
        nock.cleanAll()
      })

      it("should list containers", function(done) {

        function gotContainers(err, containers) {
          expect(err).to.be.null
          expect(containers).to.have.length(2)
          expect(containers[0]).to.contain("Id", "Image", "Command", "Created", "status")
        }

        docker().listContainers(gotContainers)

      })

    })

  })
})
