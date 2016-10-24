'use strict';

/***************TransForm SubscriptionDetails****************/
function SubscriptionStatusTrans(response) {

var subscriptionData={};
subscriptionData.SubscriptionID=response.PaymentAccountTransactionSubscriptionsId;
subscriptionData.SubscriptionStartDate= response.SubscriptionDate;
subscriptionData.SubscriptionValidityDate=response.SubscriptionValidityDate;
subscriptionData.Status=response.Status;

return subscriptionData;
}


/***************TransForm SubscriptionDetails****************/
function UpdateSubscriptionStatusTrans(response) {

var subscriptionData={};
if(response[0])
{
subscriptionData.SubscriptionID=response[0].PaymentAccountTransactionSubscriptionsId;
subscriptionData.SubscriptionStartDate= response[0].SubscriptionDate;
subscriptionData.SubscriptionValidityDate=response[0].SubscriptionValidityDate;
subscriptionData.Status=response[0].Status;
}
return subscriptionData;
}


exports.SubscriptionStatusTrans=SubscriptionStatusTrans;
exports.UpdateSubscriptionStatusTrans=UpdateSubscriptionStatusTrans;