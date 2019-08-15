const persistence = require('../persistence/users')
const bcrypt = require('bcrypt')
const async = require('async')
const _ = require('lodash')

module.exports = async (incoming, callback) => {

    const validatedata = (_callback) => {
        let err = ''
        if(incoming){
            if(!/^\S+@\S+$/.test(incoming.email)) err = 'Please enter valid email!'
            else if(!incoming.password) err = 'Please enter password!'  
        }else err = 'Invalid Data!' 
        _callback(err)
    }

    const getuser = (_callback) => {
        persistence.getuser(incoming, (err, resp) => {
            let password = ''
            if(!err){
                if(!resp) err = `User with email ${incoming.email} does not exist!`
                else password = resp.password
            }
            _callback(err, password) 
        })
    }

    const verifypassword = (password,_callback) => {
       let err = null
       const isvalid = bcrypt.compareSync(incoming.password, password)
       if(!isvalid) err = 'Invalid credentials!'
       _callback(err)
    }


    async.waterfall([validatedata, getuser, verifypassword], err => {
        let res = {}
        //send code 0 for suceess and 1 for failure
        if(err){
            res.code = 1
            res.msg = err
        }else{
            res.code = 0
            res.msg = 'Success'
        }
        callback(res)
    })
}