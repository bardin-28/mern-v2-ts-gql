#!/bin/bash

set +x

docker exec -it node-db bash

mongo -u admin -p root --authenticationDatabase db_name

use db_name

db.User.insert({ _id: 1 })

db.createUser({
    user: "admin",
    pwd: "root",
    roles: [ { role: "readWrite", db: "db_name" } ]
})
