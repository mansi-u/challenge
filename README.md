# SETUP

## Setting Up Database

Run the users.sql file to create users table.

## Setting up the configuration

set the configuration in config.json file.

## Start the application

node service.js

## Folder Structure

./apis: contains the logic for apis

./connectors: contains the logic for connecting to different storage systems e.x mysql, redis etc

./persistence: contains the logic to interact with storage systems

./sys: contains the main helpers files such as log

./routers: contains the express router files 

## Apis available

Post http://host:port/users/createuser

Requet

{
	"email": "abc@gmail.com",
	"password": "abc",
	"fname": "abc",
	"lname": "def"
}

Response

{
    "code": 0,
    "msg": "Success"
}

Post http://host:port/users/verifyuser

Request

{
	"email":"mansi4upadhyaya@gmail.com",
	"password": "abc1"
}

Response:

{
    "code": 0,
    "msg": "Success"
}

Get http://host:port/users/getuserdetails/:userid

Repsonse

{
    "code": 0,
    "msg": "Success",
    "email": "abc@gmail.com",
    "organizationid": null,
    "roleid": null,
    "fname": "abc",
    "lname": "def"
}
