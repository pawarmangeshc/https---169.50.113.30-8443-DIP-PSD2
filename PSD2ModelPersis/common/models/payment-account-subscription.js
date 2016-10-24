'use strict';
var loggerManager=require('../../common/config/logger');
var logger=loggerManager.getLogger();
module.exports = function(Paymentaccountsubscription) {
    
/*****************Disabling Inbuilt Api Method */
Paymentaccountsubscription.disableRemoteMethod("create", true);
Paymentaccountsubscription.disableRemoteMethod("upsert", true);
Paymentaccountsubscription.disableRemoteMethod("updateAll", true);
Paymentaccountsubscription.disableRemoteMethod("updateAttributes", false); 
Paymentaccountsubscription.disableRemoteMethod("find", true);
Paymentaccountsubscription.disableRemoteMethod("findById", true);
Paymentaccountsubscription.disableRemoteMethod("findOne", true);
Paymentaccountsubscription.disableRemoteMethod("replaceOrCreate", true);
Paymentaccountsubscription.disableRemoteMethod("deleteById", true); 
Paymentaccountsubscription.disableRemoteMethod("confirm", true);
Paymentaccountsubscription.disableRemoteMethod("count", true);
Paymentaccountsubscription.disableRemoteMethod("exists", true);
Paymentaccountsubscription.disableRemoteMethod("resetPassword", true);
Paymentaccountsubscription.disableRemoteMethod("upsertWithWhere", true);
Paymentaccountsubscription.disableRemoteMethod("replaceOrCreate", true);
Paymentaccountsubscription.disableRemoteMethod("replaceById", true);

var adapterHandler=require('../../common/adapter/psdaccountsubv10');

/*******************GetPayment Account Subcription Details*************/
Paymentaccountsubscription.getSubscriptionDetails = function(params, cb) {
    var fileName="paymentAccountSubscription";
    var methodName="getSubscriptionDetails";
    logger.debug('Entering >>>>>>>>>'+fileName+ "MethodName  "+methodName);

    /*************Calling Adpter Method*****************/
    adapterHandler.retriveSubscription(Paymentaccountsubscription,params,cb);
    
    logger.debug('Exiting>>>>>>>>>>>>>>> '+fileName+ "MethodName  "+methodName);
 
}
Paymentaccountsubscription.remoteMethod (
        'getSubscriptionDetails',
        {
          http: {path: '/', verb: 'get'},
          returns: {arg: 'PaymentAccountSubscription', type: 'object'},
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
Paymentaccountsubscription.createSubscription = function(params, cb) {
    var fileName="paymentAccountSubscription";
    var methodName="createSubscription";
    logger.debug('Entering >>>>>>>>>>>'+fileName+ "MethodName  "+methodName);

    /***************Adapter Method Call******************/
    adapterHandler.createSubscription(Paymentaccountsubscription,params,cb);
    
    logger.debug('Exiting>>>>>>>>>> '+fileName+ "MethodName  "+methodName);
 }
  
Paymentaccountsubscription.remoteMethod ('createSubscription',
        {
          http: {path: '/', verb: 'POST'},
          returns: {arg: 'PaymentAccountSubscription', type: 'object'},
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
Paymentaccountsubscription.modifySubscription = function(params, cb) {
    var fileName="paymentAccountSubscription";
    var methodName="modifySubscription";
    logger.debug('Entering >>>>>>>>>'+fileName+ "MethodName  "+methodName);

    /*****************Adapter Call***************/
     adapterHandler.updateSubscription(Paymentaccountsubscription,params,cb);

     logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);
 }
  
Paymentaccountsubscription.remoteMethod (
        'modifySubscription',
        {
          http: {path: '/', verb: 'PATCH'},
           returns: {arg: 'PaymentAccountSubscription', type: 'object'},
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
    
  /*****************Cancel Subcription Details ******************/	
Paymentaccountsubscription.cancelSubscription = function(params, cb) {

  var fileName="paymentAccountSubscription";
  var methodName="cancelSubscription";
  logger.debug('Entering >>>>>>>>>'+fileName+ "MethodName  "+methodName);

 /****************Adapter Call*****************/
 adapterHandler.cancelSubscription(Paymentaccountsubscription,params,cb);

logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);
 }
  
Paymentaccountsubscription.remoteMethod (
        'cancelSubscription',
        {
          http: {path: '/', verb: 'PUT'},
          returns: {arg: 'PaymentAccountSubscription', type: 'object'},
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
	  
	
};
