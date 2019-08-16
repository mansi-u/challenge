const request = require('supertest')
const app = require('../service.js')
const expect = require('chai').expect

describe('Users', () =>  {
    it('Create User', (done) => {
      request(app)
        .post('/users/createuser')
        .send({
            "email": "abc1@gmail.com",
            "password": "abc",
            "fname": "abc",
            "lname": "def"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200).then(response => {
            expect(response.body.code).to.be.equal(0)
            done()
        }).catch(done)
    })

    it('Duplicate User', (done) => {
        request(app)
          .post('/users/createuser')
          .send({
              "email": "abc@gmail.com",
              "password": "abc",
              "fname": "abc",
              "lname": "def"
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(1)
              done()
          }).catch(done)
      })

      it('Create User - Invalid Email', (done) => {
        request(app)
          .post('/users/createuser')
          .send({
              "email": "abc2mail.com",
              "password": "abc",
              "fname": "abc",
              "lname": "def"
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(1)
              done()
          }).catch(done)
      })

      it('Verify User - Correct Password', (done) => {
        request(app)
          .post('/users/verifyuser')
          .send({
              "email": "abc@gmail.com",
              "password": "abc",
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(0)
              done()
          }).catch(done)
      })

      it('Verify User - Incorrect Password', (done) => {
        request(app)
          .post('/users/verifyuser')
          .send({
              "email": "abc@gmail.com",
              "password": "abc1",
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(1)
              done()
          }).catch(done)
      })

      it('Get user details', (done) => {
        request(app)
          .get('/users/getuserdetails/1')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(0)
              done()
          }).catch(done)
      })

      it('Get user details - Invalid user id', (done) => {
        request(app)
          .get('/users/getuserdetails/abc')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200).then(response => {
              expect(response.body.code).to.be.equal(1)
              done()
          }).catch(done)
      })
  })