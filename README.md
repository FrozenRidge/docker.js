docker.js
=========

Node.JS wrapper for low-level Docker.io HTTP interface

Remote API: http://docs.docker.io/en/latest/api/docker_remote_api.html

Index Search API: http://docs.docker.io/en/latest/api/index_search_api.html

Registry API: http://docs.docker.io/en/latest/api/registry_api.html


## Usage

```javascript

var docker = require('docker.js')({host:"http://localhost:4243"})

function gotContainers(err, containers) {
    if (err) throw err
    console.log("Containers: ", containers)
}

docker.listContainers(gotContainers)

```

