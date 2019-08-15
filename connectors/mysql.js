const log = require('../sys/log')
require('env2')('./config.json')
const mysqlconfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
}
const pool = require('mysql').createPool(mysqlconfig)
const mysqlexport = {
  query(query, params, callback) {
    pool.getConnection((err, conn) => {
      if (err ) {
        log(`[ERROR] Failed to getConnection from mySQL - ${err}`, true, true)
        if (conn) {
          conn.release()
        }
        callback('DB error')
      }
      conn.query(query, params, (err, rows) => {
        conn.release()
        callback(err, rows)
      })
    })
  },
  end(callback) {
    pool.end(callback)
  }
}
module.exports = mysqlexport
