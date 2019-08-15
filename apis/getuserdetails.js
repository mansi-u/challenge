const persistence = require('../persistence/users')
const bcrypt = require('bcrypt')
const async = require('async')
const _ = require('lodash')
module.exports = async (userid, callback) => {

    const validatedata = (_callback) => {
        let err = ''
         if(isNaN(userid)) err= 'Invalid userid!' 
        _callback(err)
    }

    const getuser = (_callback) => {
        persistence.getuserbyid(userid, (err, resp) => {
            let password = ''
            if(!err){
                if(!resp) err = `User with userid ${userid} does not exist!`
            }
            _callback(err, resp) 
        })
    }


    async.waterfall([validatedata, getuser], (err,resp) => {
        let res = {}
        //send code 0 for suceess and 1 for failure
        if(err){
            res.code = 1
            res.msg = err
        }else{
            res.code = 0
            res.msg = 'Success'
            _.assign(res, resp)
        }
        callback(res)
    })
}