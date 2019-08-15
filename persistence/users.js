const mysql = require('../connectors/mysql')
const log = require('../sys/log')
const _ = require('lodash')
class users {
    createuser(incoming, callback){
        const  query = `INSERT INTO users (email, password, organizationid, roleid, fname, lname) VALUES (?, ?, ?, ?, ?, ?);`
        const params = [
            incoming.email,
            incoming.password,
            incoming.organizationid || null,
            incoming.roleid || null,
            incoming.fname,
            incoming.lname
        ]
        mysql.query(query, params , err => {
            if (err){
                log(err, true) //critical error
                err = 'Technical Error!'
            }
            callback(err)
        })
    }

    getuser(incoming, callback){
        const  query = `SELECT email, password, organizationid, roleid, fname, lname FROM users where email = ?;`
        const params = [
            incoming.email
        ]
        mysql.query(query, params , (err,resp) => {
            let send
            if (err){
                log(err, true) //critical error
                err = 'Technical Error!'
            }else if(!_.isEmpty(resp)) send = resp[0]
            callback(err, send)
        })   
    }

    getuserbyid(userid, callback){
        const  query = `SELECT email, organizationid, roleid, fname, lname FROM users where id = ?;`
        const params = [
            userid
        ]
        mysql.query(query, params , (err,resp) => {
            let send
            if (err){
                log(err, true) //critical error
                err = 'Technical Error!'
            }else if(!_.isEmpty(resp)) send = resp[0]
            callback(err, send)
        })
    }
}



module.exports = new users()