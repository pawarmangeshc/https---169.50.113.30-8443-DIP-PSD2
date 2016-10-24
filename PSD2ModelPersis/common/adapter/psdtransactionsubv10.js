'use strict';
var loggerManager=require('../../common/config/logger');
var psdDao=require('../../common/dao/psdpaymentTransactionDao');
var transform=require('../../common/transform/paymentaccounttransaction');
var logger=loggerManager.getLogger();

/**
 * [Create RetriveSubscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */


var retriveSubscription = function (Paymentaccounttransactionsubscription,params, cb){
     var fileName="psdtransactionsubv10", methodName="retriveSubscription";
    logger.debug('Entering >>>>>>>>>'+fileName+ " >>MethodName  "+methodName);
    try {
        psdDao.retriveSubscriptionDetailsforPaymentTransactionAccount(Paymentaccounttransactionsubscription,params,function (err, response) {
        if(!err)
            {
            logger.debug("Resonse From  BackEnd>>>>>>>>>>>"+JSON.stringify(response));
             var transFormResponse=transform.UpdateSubscriptionStatusTrans(response);
            cb(null,transFormResponse);
            }
        else{
            logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(err));
            cb(err);
        }
    });
    } catch (error) {
        cb(error);
        logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(error));
    }
logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);  


}

/**
 * [Create Subscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */


var createSubscription = function (Paymentaccounttransactionsubscription,params, cb){
    var fileName="psdaccountsubv10",methodName="createSubscription";

logger.debug('Entering >>>>>>>>>'+fileName+ " >>MethodName  "+methodName);
    try {
        psdDao.createSubscriptionForPaymentTransactionAccount(Paymentaccounttransactionsubscription,params,function (err, response) {
        if(!err)
            {
            logger.debug("Response Recieved From BackEnd>>>"+JSON.stringify(response));    
            var transFormResponse=transform.SubscriptionStatusTrans(response);
            cb(null,transFormResponse);
            }
        else{
            logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(err));
            cb(err);
        }
    });
    } catch (error) {
        logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(error));
        cb(error);
    }
logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);

}

/**
 * [Update Account Subscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */

var updateSubscription = function (Paymentaccounttransactionsubscription,params, cb){
 var fileName="psdaccountsubv10",methodName="updateSubscription";
logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName  "+methodName);
    try {
        psdDao.updatePaymentTranasactionAccountSubscription(Paymentaccounttransactionsubscription,params,function (err, response) {
        if(!err)
            {     
            logger.debug("Response REcieved From BackEnd System >>>>>>>>>>"+JSON.stringify(response));
            var transFormResponse=transform.UpdateSubscriptionStatusTrans(response);    
            logger.debug("Response After Transform >>>>>>>>>>"+JSON.stringify(transFormResponse));      
            cb(null,transFormResponse);
            }
        else{
            logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(err));
            cb(err);
        }
    });
    } catch (error) {
        logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(err));
        cb(error);
    }
logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);
}

/**
 * [Cancel Subscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */

var cancelSubscription = function (Paymentaccounttransactionsubscription,params, cb){
  
var fileName="psdaccountsubv10",methodName="cancelSubscription";
logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName  "+methodName);
    try {
        psdDao.cancelPaymentTransactioAcccountSubscription(Paymentaccounttransactionsubscription,params,function (err, response) {
        if(!err)
           {
            var transFormResponse=transform.UpdateSubscriptionStatusTrans(response);    
            logger.debug("Response After Transform >>>>>>>>>>"+JSON.stringify(transFormResponse));      
            cb(null,transFormResponse);
           }
        else{
            logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(err));
            cb(err);
        }
    });
    } catch (error) {
        logger.error("Error from BackEnd>>>>>>>>>>>"+JSON.stringify(error));
        cb(error);
    }
logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);
}






exports.retriveSubscription=retriveSubscription;
exports.createSubscription=createSubscription;
exports.updateSubscription=updateSubscription;
exports.cancelSubscription=cancelSubscription;











