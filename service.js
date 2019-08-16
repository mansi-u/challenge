require('env2')('./config.json')
const log = require('./sys/log')
const userrouter = require('./routers/users')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
require('./sys/gracefullexit')

app.listen(process.env.APPLICATION_PORT, () => log(`server running on port ${process.env.APPLICATION_PORT}`));

app.use(bodyParser.json())
app.use(bodyParser.raw())

app.use('/users', userrouter)

module.exports = app