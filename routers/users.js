const express = require('express')
const router = express.Router()
const createuser = require('../apis/createuser')
const verifyuser = require('../apis/verifyuser')
const getuserdetails = require('../apis/getuserdetails')

router.post('/createuser', (req, res) => {
    createuser(req.body, response => {
      res.send(response)
    })
})

router.post('/verifyuser', (req, res) => {
    verifyuser(req.body, response => {
      res.send(response)
    })
})
    
router.get('/getuserdetails/:userid', (req, res) => {
  getuserdetails(req.params.userid, response => {
    res.send(response)
  })
})


  module.exports = router