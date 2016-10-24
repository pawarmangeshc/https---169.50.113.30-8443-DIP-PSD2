'use strict';
module.exports = function(Paymentaccounttransactionsubscription) {
    
/*****************Disabling Inbuilt Api Method */
Paymentaccounttransactionsubscription.disableRemoteMethod("create", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("upsert", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("updateAll", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("updateAttributes", false); 
Paymentaccounttransactionsubscription.disableRemoteMethod("find", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("findById", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("findOne", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("replaceOrCreate", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("deleteById", true); 
Paymentaccounttransactionsubscription.disableRemoteMethod("confirm", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("count", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("exists", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("resetPassword", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("upsertWithWhere", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("replaceOrCreate", true);
Paymentaccounttransactionsubscription.disableRemoteMethod("replaceById", true);
var adapterHandler=require('../../common/adapter/psdtransactionsubv10');

/*******************GetPayment Account Subcription Details*************/
Paymentaccounttransactionsubscription.getSubscriptionDetails = function(params, cb) {
    adapterHandler.retriveSubscription(Paymentaccounttransactionsubscription,params,cb);
 
}
Paymentaccounttransactionsubscription.remoteMethod (
        'getSubscriptionDetails',
        {
          http: {path: '/', verb: 'get'},
          returns: {arg: 'Paymentaccounttransactionsubscription', type: 'object'},
           accepts: [
         {
          'arg': 'params',
          'type': 'object',
          'http': function (ctx) {
            var method =ctx.req.method;
			var params={};
            params.accountId=ctx.req.param('accountId');
            params.subscriptionId=ctx.req.param('subscriptionId');
			//params.body = ctx.req.body;
           return params;
          }
	    }]
          
        }
    );
    
/*******************Create Payment Account Subscription *****************/    
Paymentaccounttransactionsubscription.createSubscription = function(params, cb) {
    adapterHandler.createSubscription(Paymentaccounttransactionsubscription,params,cb);

 }
  
Paymentaccounttransactionsubscription.remoteMethod ('createSubscription',
        {
          http: {path: '/', verb: 'POST'},
          returns: {arg: 'Paymentaccounttransactionsubscription', type: 'object'},
         accepts: [
         {
          'arg': 'params',
          'type': 'object',
          'http': function (ctx) {
            var method =ctx.req.method;
			var params={};
			params.body = ctx.req.body;
           return params;
          }
	    }]
          
        }
    );
    
/*****************Update Subcription Details ******************/	
Paymentaccounttransactionsubscription.modifySubscription = function(params, cb) {
 adapterHandler.updateSubscription(Paymentaccounttransactionsubscription,params,cb);

 }
  
Paymentaccounttransactionsubscription.remoteMethod (
        'modifySubscription',
        {
          http: {path: '/', verb: 'PATCH'},
         accepts: [
        {
          'arg': 'params',
          'type': 'object',
          'http': function (ctx) {
            var method =ctx.req.method;
			var params={};
			params.body = ctx.req.body;
           return params;
          }
	}],
          returns: {arg: 'name', type: 'string'}
        }
    );	
    
  /*****************Cancel Subcription Details ******************/	
Paymentaccounttransactionsubscription.cancelSubscription = function(params, cb) {
 adapterHandler.cancelSubscription(Paymentaccounttransactionsubscription,params,cb);

 }
  
Paymentaccounttransactionsubscription.remoteMethod (
        'cancelSubscription',
        {
          http: {path: '/', verb: 'PUT'},
         accepts: [
        {
          'arg': 'params',
          'type': 'object',
          'http': function (ctx) {
            var method =ctx.req.method;
			var params={};
			params.body = ctx.req.body;
            return params;
          }
	}],
          returns: {arg: 'name', type: 'string'}
        }
    );	
	  

};
