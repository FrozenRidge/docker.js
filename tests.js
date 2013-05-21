var docker = require('./index')
var expect = require('chai').expect
var nock = require('nock')

var host = "http://localhost:4243"

describe("docker.js", function() {

  describe("#containers", function() {

    describe("#createContainer", function() {

      var opts = {
        "Hostname":"",
        "User":"",
        "Memory":0,
        "MemorySwap":0,
        "AttachStdin":false,
        "AttachStdout":true,
        "AttachStderr":true,
        "PortSpecs":null,
        "Tty":false,
        "OpenStdin":false,
        "StdinOnce":false,
        "Env":null,
        "Cmd":[
                "date"
        ],
        "Dns":null,
        "Image":"base",
        "Volumes":{},
        "VolumesFrom":""
      }

      it("should create a new container", function(done) {

        var res = {Id:"abcde", Warnings:[]}
        var scope = nock(host).post('/containers/create').reply(201, res)

        function handler(err, r) {

          expect(err).to.be.null
          expect(r).to.include.keys(['Id', 'Warnings'])
          scope.done()
          done()
        }

        docker().createContainer(opts, handler)

      })
    })

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
          expect(c).to.have.length(2)
          expect(c[0]).to.include.keys(Object.keys(containers[0]))
          expect(c[1]).to.include.keys(Object.keys(containers[1]))
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)

      })

      it("should error on non-200 from server", function(done) {
        var scope = nock(host).get('/containers/ps').reply(500, [])

        function gotContainers(err, c) {
          expect(err).to.exist
          expect(c).to.eql([])
          scope.done()
          done()
        }

        docker().listContainers(gotContainers)

      })

    })

  })
})
