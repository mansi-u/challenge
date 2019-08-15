const persistence = require('../persistence/users')
const bcrypt = require('bcrypt')
const async = require('async')

module.exports = async (incoming, callback) => {

    const validatedata = (_callback) => {
        let err = ''
        if(incoming){
            if(!/^\S+@\S+$/.test(incoming.email)) err = 'Please enter valid email!'
            else if(!incoming.password) err = 'Please enter password!'
            else if(!incoming.fname) err = 'Please enter first name!'
            else if(!incoming.lname) err = 'Please enter last name!'
            else if(incoming.organizationid && isNaN(incoming.organizationid)) err = 'Organizationid should be numeric!'
            else if(incoming.roleid && isNaN(incoming.roleid)) err = 'Roleid should be numeric!'   
        }else err = 'Invalid Data!' 
        _callback(err)
    }

    const checkduplicate = (_callback) => {
        let err = '' 
        persistence.getuser(incoming, (err, resp) => {
            if(!err && resp) err = `User already exists with email ${incoming.email}`
            _callback(err)  
        })
    }

    const convpassword = (_callback) => {
        incoming.password = bcrypt.hashSync(incoming.password, Number(process.env.SALT_ROUNDS))
        _callback()
    }

    const createuser = (_callback) => {
        persistence.createuser(incoming, _callback)
    }



    async.waterfall([validatedata, checkduplicate, convpassword, createuser], err => {
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