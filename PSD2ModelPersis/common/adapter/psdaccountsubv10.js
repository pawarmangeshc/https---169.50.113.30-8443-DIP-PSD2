'use strict';


var psdDao=require('../../common/dao/psdpaymentaccountDao');
var transform=require('../../common/transform/paymentaccountsubscription');
var loggerManager=require('../../common/config/logger');
var logger=loggerManager.getLogger();

/**
 * [Create RetriveSubscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */


var retriveSubscription = function (Paymentaccountsubscription,params, cb){
    var fileName="psdaccountsubv10",methodName="retriveSubscription";
    logger.debug('Entering >>>>>>>>>'+fileName+ " >>MethodName  "+methodName);
    try {
        psdDao.retriveSubscriptionDetailsforPaymentAccount(Paymentaccountsubscription,params,function (err, response) {
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
        logger.error("Error In Transforming Response>>>>>>>>>>>");
    }
logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);  

}

/**
 * [Create Subscription Details]
 * @param  {[type]} params [Http Parameters]
 * @param  {[type]} cb     [Callback]
 */


var createSubscription = function (Paymentaccountsubscription,params, cb){
var fileName="psdaccountsubv10",methodName="createSubscription";

logger.debug('Entering >>>>>>>>>'+fileName+ " >>MethodName  "+methodName);
    try {
        psdDao.createSubscriptionForPaymentAccount(Paymentaccountsubscription,params,function (err, response) {
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

var updateSubscription = function (Paymentaccountsubscription,params, cb){
var fileName="psdaccountsubv10",methodName="updateSubscription";
logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName  "+methodName);
    try {
        psdDao.updatePaymentAccountSubscription(Paymentaccountsubscription,params,function (err, response) {
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

var cancelSubscription = function (Paymentaccountsubscription,params, cb){
  
var fileName="psdaccountsubv10",methodName="cancelSubscription";
logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName  "+methodName);
    try {
        psdDao.cancelPaymentAcccountSubscription(Paymentaccountsubscription,params,function (err, response) {
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











