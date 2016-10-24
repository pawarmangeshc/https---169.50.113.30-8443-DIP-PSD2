'use strict';
var loggerManager=require('../../common/config/logger');
var logger=loggerManager.getLogger();
var psdutility=require('../../common/util/psdutility');
var ErrorHandler=require('../../common/errorhandler/psdexceptionHandler');

var retriveSubscriptionDetailsforPaymentAccount = function (Paymentaccountsubscription,params, cb){
    var fileName="retriveSubscriptionDao",methodName="retriveSubscription";
    
    logger.debug('Entering >>>>>>>>>'+fileName+ "MethodName  "+methodName);
    try {
       
        var filterString=psdutility.retriveSubscriptionDetails(params);
         logger.debug('Filter String from Utility >>>>>>>>'+JSON.stringify(filterString));
        try {
            Paymentaccountsubscription.find({ where: filterString}, function (err, responseInstance) {
             if(!err){   
                  cb(null, responseInstance);
             }
             else{
                 logger.err('Error From BackEnd >>>>>>>>'+JSON.stringify(err));
                 cb(err);
             }   
          });
        } catch (error) {
            logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
            cb(new ErrorHandler.CommonApplicationError('EXE002', '[:' + error.name + ']: ' + error.message, methodName));
        }
       
    } catch (error) {
        logger.error("Somthign Wrong here >>>>>>>>>>>>"+JSON.stringify(error));
        cb(error);
    }
   logger.debug('Exiting >>>>>>>>>'+fileName+ "MethodName  "+methodName);  

}


var createSubscriptionForPaymentAccount = function (Paymentaccountsubscription,params, cb){
     var fileName="psdDao",methodName="createSubscriptionForPaymentAccount";
    logger.debug('Entering >>>>>>>>>'+fileName+ "  >>MethodName >> "+methodName);

try {
         var inputString=psdutility.createSubscriptionDetails(params);
         logger.debug("Input Data>>>>>>>>"+JSON.stringify(inputString));
        
        try {
             Paymentaccountsubscription.create(inputString, function (err, response) {
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



var updatePaymentAccountSubscription = function (Paymentaccountsubscription,params, cb){
  var updatefilter={};
  try {
       updatefilter.PaymentAccountSubscriptionsId=params.body.PaymentAccountSubscriptionsId;
       var updateString=psdutility.updateSubscriptionDetails(params);
       try {
            Paymentaccountsubscription.updateAll(updatefilter,updateString, function (err, instance) {
            if(!err)
                {
                console.log(instance);
                try {
                    var updatefilter={};
                    updatefilter.PaymentAccountSubscriptionsId=params.body.PaymentAccountSubscriptionsId;
                    Paymentaccountsubscription.find(updatefilter, function (err, response) {
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



var cancelPaymentAcccountSubscription = function (Paymentaccountsubscription,params, cb){
  try {
        var cancelSubData=psdutility.cancelSubscription(params);
        var cancelfilter={};
        cancelfilter.PaymentAccountSubscriptionsId=params.body.PaymentAccountSubscriptionsId;
        try {
            Paymentaccountsubscription.updateAll(cancelfilter,cancelSubData,function (err, instance) {
            if(!err){
                console.log(instance);
               try {
                    var updatefilter={};
                    updatefilter.PaymentAccountSubscriptionsId=params.body.PaymentAccountSubscriptionsId;
                    Paymentaccountsubscription.find(cancelfilter, function (err, response) {
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





exports.retriveSubscriptionDetailsforPaymentAccount=retriveSubscriptionDetailsforPaymentAccount;
exports.createSubscriptionForPaymentAccount=createSubscriptionForPaymentAccount;
exports.updatePaymentAccountSubscription=updatePaymentAccountSubscription;
exports.cancelPaymentAcccountSubscription=cancelPaymentAcccountSubscription;