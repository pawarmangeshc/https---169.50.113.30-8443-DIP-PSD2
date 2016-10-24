
var supertest = require('supertest');
var app = require('../../../server/server.js');
var chai = require('chai')
  , spies = require('chai-spies')

chai.use(spies);

var expect = chai.expect;
var should = chai.should();

function server(verb, url) {
  return supertest(app)[verb](url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .expect('Vary', 'Origin, Accept-Encoding');
}

var server1= supertest.agent(app);

describe('Unit Test payment-account-subscription ', function() {

  it('GET / - Pass', function(done) {
    server('get','/api/PaymentAccountSubscriptions')
       .set('Content-Type', 'application/json')
       .expect(200)
       .end(function(err, res) {
         if (err) {
           return done(err);
         }
         res.status.should.equal(200);
         console.log(res.body);
         done();
       });
   });
   
    it('POST / - Pass', function(done) {
    server1.post('/api/PaymentAccountSubscriptions')
       .set('Content-Type', 'application/json')
       .expect(200)
       .end(function(err, res) {
         if (err) {
           return done(err);
         }
         res.status.should.equal(200);
         console.log(res.body);
         done();
       });
   });
   
   it('PATCH / - Pass', function(done) {
    server1.patch('/api/PaymentAccountSubscriptions')
       .set('Content-Type', 'application/json')
       .expect(200)
       .end(function(err, res) {
         if (err) {
           return done(err);
         }
         res.status.should.equal(200);
         console.log(res.body);
         done();
       });
   });
   
it('PUT / - Pass', function(done) {
   server1.put('/api/PaymentAccountSubscriptions')
       .set('Content-Type', 'application/json')
       .expect(200)
       .end(function(err, res) {
         if (err) {
           return done(err);
         }
         res.status.should.equal(200);
         console.log(res.body);
         done();
       });
   });
   
});   