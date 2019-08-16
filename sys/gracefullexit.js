 const mysql = require('../connectors/mysql')
 const log = require('./log')
 const gracefulshutdown = () => {
     mysql.end(() => {
        log('Service has shutted down gracefully.')
        process.exit()
     })      
}
 
 // register event on TERM signal .e.g. kill pid
  process.on('SIGTERM', gracefulshutdown)
  // register event on INT signal e.g. Ctrl-C
  process.on('SIGINT', gracefulshutdown)