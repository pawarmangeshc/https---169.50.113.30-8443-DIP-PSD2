'use strict';
var ObjectId = require('mongodb').ObjectID;

/***************Store Subscription Details in Persistence System****************/
function createSubscriptionDetails(params) {
var requestBodyData=params.body;
var currentdate = new Date(); 
var currentDateTime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
		
var now = new Date();
now.setDate(now.getDate() + 90);	
var SubscriptionValidityDate=
				  now.getDate() + "/"
                + (now.getMonth()+1)  + "/" 
                + now.getFullYear() + " "  
                + now.getHours() + ":"  
                + now.getMinutes() + ":" 
                + now.getSeconds();	
				
var id = new ObjectId();
var subscriptionData={};
subscriptionData.PaymentAccountSubscriptionsId=id.toString();
subscriptionData.TppId=requestBodyData.TppId;	
subscriptionData.TppName=requestBodyData.TppName;
subscriptionData.AccountId=requestBodyData.AccountId;
subscriptionData.MaxPaymentAmountLimit=requestBodyData.MaxPaymentAmountLimit;
subscriptionData.PaymentCcy="EURO";
subscriptionData.SubscriptionDate= currentDateTime;
subscriptionData.SubscriptionValidityDate=SubscriptionValidityDate;
subscriptionData.Status="Active";

		
return subscriptionData;
}

/***************RetriveSubscription Details From System****************/
function retriveSubscriptionDetails(params) {
var accountId=params.accountId;
var subscriptionId=params.subscriptionId;
var retriveDetails={};
if(accountId)
    retriveDetails.AccountId=accountId;
if(subscriptionId)
    retriveDetails.PaymentAccountSubscriptionsId=subscriptionId;

return retriveDetails;
}


/***************updateSubscription Details in Persitence System****************/
function updateSubscriptionDetails(params) {
var requestBody=params.body;
var currentdate = new Date(); 
var todayDateTime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
var updateData={};
	
	//updatefilter.updateData.TppId=requestBody.TppId;
	//updatefilter.updateData.TppName=requestBody.TppName;
	//updatefilter.updateData.AccountId=requestBody.AccountId;
	updateData.MaxPaymentAmountLimit=requestBody.MaxPaymentAmountLimit;
	updateData.SubscriptionModificationDate=todayDateTime;
	//updatefilter.updateData.PaymentCcy=requestBody.PaymentCcy;
	
	
return updateData;
}



/***************Cancel Subscription****************/
function cancelSubscription(params) {

var currentdate = new Date(); 
var todayDateTime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
				
console.log("Today Date is>>>>>>>>>>>>"+todayDateTime);

var updateData={};
	
	//updatefilter.updateData.TppId=requestBody.TppId;
	//updatefilter.updateData.TppName=requestBody.TppName;
	//updatefilter.updateData.AccountId=requestBody.AccountId;
	updateData.SubscriptionCancellationDate=todayDateTime;
    updateData.SubscriptionValidityDate=todayDateTime;
	updateData.Status="Inactive";
	//updatefilter.updateData.PaymentCcy=requestBody.PaymentCcy;
	
	
return updateData;
}




exports.createSubscriptionDetails=createSubscriptionDetails;
exports.retriveSubscriptionDetails=retriveSubscriptionDetails;
exports.updateSubscriptionDetails=updateSubscriptionDetails;
exports.cancelSubscription=cancelSubscription;

