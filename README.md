*[Note: The Docker Remote API is super new, and all of this is likely to change. Consider this semi-functional vaporware for now.]*

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

// Unimplemented yet:
docker.createContainer(opts, cb);
docker.inspectContainer(opts, cb);
docker.inspectContainerChanges(opts, cb);
docker.exportContainer(opts, cb);
docker.startContainer(opts, cb);
docker.stopContainer(opts, cb);
docker.restartContainer(opts, cb);
docker.killContainer(opts, cb);
docker.attachToContainer(opts, cb);
docker.waitContainer(opts, cb);
docker.removeContainer(opts, cb);

docker.listImages(opts, cb);
docker.createImage(opts, cb);
docker.insertFileImage(opts, cb);
docker.inspectImage(opts, cb);
docker.historyImage(opts, cb);
docker.pushImage(opts, cb);
docker.tagImage(opts, cb);
docker.removeImage(opts, cb);
docker.searchImages(opts, cb);

docker.build(opts, cb);
docker.auth(opts, cb);
docker.systemInfo(opts, cb);
docker.commit(opts, cb);

docker.version(cb)



```

