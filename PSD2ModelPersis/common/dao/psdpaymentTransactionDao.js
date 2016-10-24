'use strict';
var loggerManager=require('../../common/config/logger');
var logger=loggerManager.getLogger();
var psdutility=require('../../common/util/paymentaccounttransactionutil');

var retriveSubscriptionDetailsforPaymentTransactionAccount = function (Paymentaccounttransactionsubscription,params, cb){
    var fileName="psdpaymentTransactionDao",methodName="retriveSubscription";
    
    logger.debug('Entering >>>>>>>>>'+fileName+ "MethodName  "+methodName);
    try {
       
        var filterString=psdutility.retriveSubscriptionDetails(params);
         logger.debug('Filter String from Utility >>>>>>>>'+JSON.stringify(filterString));
        try {
            Paymentaccounttransactionsubscription.find({where :filterString}, function (err, instance) {

             if(!err){   
                logger.debug('Response From BackEnd >>>>>>>>'+JSON.stringify(instance));
                  cb(null, instance);
             }
             else{
                 logger.err('Error From BackEnd >>>>>>>>'+JSON.stringify(err));
                 cb(err);
             }   
          });
        } catch (error) {
            logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
             cb(error);
        }
       
    } catch (error) {
        logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
        cb(error);
    }
   logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);  

}


var createSubscriptionForPaymentTransactionAccount = function (Paymentaccounttransactionsubscription,params, cb){
     var fileName="psdDao",methodName="createSubscriptionForPaymentTransactionAccount";
    logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName >> "+methodName);

try {
         var inputString=psdutility.createSubscriptionDetails(params);
         logger.debug("Input Data>>>>>>>>"+JSON.stringify(inputString));
        
        try {
             Paymentaccounttransactionsubscription.create(inputString, function (err, response) {
        if(err){
            logger.error("Error From BackEnd>>>>>>>>>>>>>"+JSON.stringify(err));
            cb(err);
        }else{    
             logger.debug("Response From BackEnd>>>>>>>>>>>>>"+JSON.stringify(response));
             cb(null, response);
        }
        });
        } catch (error) {
            cb(error);
          logger.error("Error From BackEnd>>>>>>>>>>>>>");
        }
     
} catch (error) {
         cb(error);
        logger.error("Somthign Wrong >>>>>>>>>>>>>");
    }
  logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);  

}



var updatePaymentTranasactionAccountSubscription = function (Paymentaccounttransactionsubscription,params, cb){
  var updatefilter={};
  try {
       updatefilter.PaymentaccounttransactionsubscriptionsId=params.body.PaymentaccounttransactionsubscriptionsId;
       var updateString=psdutility.updateSubscriptionDetails(params);
       try {
            Paymentaccounttransactionsubscription.updateAll(updatefilter,updateString, function (err, instance) {
            if(!err)
                {
                 logger.debug('Filter String from Utility >>>>>>>>'+JSON.stringify(instance));
                try {
                     Paymentaccounttransactionsubscription.find({where :updatefilter}, function (err, response) {
                    if(!err){   
                            cb(null, response);
                            }
                    else{
                        logger.error('Error From BackEnd >>>>>>>>'+JSON.stringify(err));
                        cb(err);
                             }});
                     } catch (error) {
                     logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
                     cb(error);
                     }
                
             }else{
                cb(err);
              }});
       } catch (error) {
            cb(error);
       }
      
  } catch (error) {
      cb(error);
  }
 
}



var cancelPaymentTransactioAcccountSubscription = function (Paymentaccounttransactionsubscription,params, cb){
  try {
        var cancelSubData=psdutility.cancelSubscription(params);
        var cancelfilter={};
        cancelfilter.PaymentAccountTransactionSubscriptionsId=params.body.PaymentAccountTransactionSubscriptionsId;
        try {
            Paymentaccounttransactionsubscription.updateAll(cancelfilter,cancelSubData,function (err, instance) {
            if(!err){

               try {
                    var updatefilter={};
                    updatefilter.PaymentAccountTransactionSubscriptionsId=params.body.PaymentAccountTransactionSubscriptionsId;
                    Paymentaccounttransactionsubscription.find({where :cancelfilter}, function (err, response) {
                    if(!err){   
                        cb(null, response);
                        }
                    else{
                        logger.error('Error From BackEnd >>>>>>>>'+JSON.stringify(err));
                        cb(err);
                             }});
                     } catch (error) {
                     logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
                     cb(error);
                     }
            }
             else{
                 cb(err);
             }   
      
     });
        } catch (error) {
            cb(error)
        }


  } catch (error) {
    cb(error);  
  }
}





exports.retriveSubscriptionDetailsforPaymentTransactionAccount=retriveSubscriptionDetailsforPaymentTransactionAccount;
exports.createSubscriptionForPaymentTransactionAccount=createSubscriptionForPaymentTransactionAccount;
exports.updatePaymentTranasactionAccountSubscription=updatePaymentTranasactionAccountSubscription;
exports.cancelPaymentTransactioAcccountSubscription=cancelPaymentTransactioAcccountSubscription;