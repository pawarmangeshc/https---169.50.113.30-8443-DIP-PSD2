var chai = require('chai')
  , spies = require('chai-spies')
  , sinon = require("sinon");
var expect = chai.expect;
var should = chai.should();
chai.use(spies);

var psdutility = require("../../../common/util/psdutility.js");
var subscriptionData={};
var retriveDetails={};
var params= require('../mockdata/params.json');

describe('1. Unit Test of psdutility', function () {

  subscriptionData=psdutility.createSubscriptionDetails(params);
 
  it('1.1 subscriptionData is set properly.', function (done) {
    subscriptionData.should.not.equal(null);
    done();
  });

});

describe('2. Test retriveSubscriptionDetails of psdutility', function () {

  retriveDetails=psdutility.retriveSubscriptionDetails(params);
 
  it('2.1 subscriptionData is set properly.', function (done) {
    retriveDetails.should.not.equal(null);
    done();
  });

});

describe('3. Test updateSubscriptionDetails of psdutility', function () {

  var updateData=psdutility.updateSubscriptionDetails(params);
 
  it('3.1 subscriptionData is set properly.', function (done) {
    updateData.should.not.equal(null);
    done();
  });

});

describe('4. Test cancelSubscription of psdutility', function () {

  var updateData=psdutility.cancelSubscription(params);
 
  it('4.1 subscriptionData is set properly.', function (done) {
    updateData.should.not.equal(null);
    done();
  });

});

