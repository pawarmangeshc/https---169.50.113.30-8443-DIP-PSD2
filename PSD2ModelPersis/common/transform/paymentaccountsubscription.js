'use strict';

/***************TransForm SubscriptionDetails****************/
function SubscriptionStatusTrans(response) {

var subscriptionData={};
subscriptionData.SubscriptionID=response.PaymentAccountSubscriptionsId;
subscriptionData.SubscriptionStartDate= response.SubscriptionDate;
subscriptionData.SubscriptionValidityDate=response.SubscriptionValidityDate;
subscriptionData.Status=response.Status;

return subscriptionData;
}


/***************TransForm SubscriptionDetails****************/
function UpdateSubscriptionStatusTrans(response) {

var subscriptionStatus=[];

response.forEach(function (column) {
    var Status={};
    Status.SubscriptionID=column.PaymentAccountSubscriptionsId;
    Status.SubscriptionStartDate= column.SubscriptionDate;
    Status.SubscriptionValidityDate=column.SubscriptionValidityDate;
    Status.Status=column.Status;
    subscriptionStatus.push(Status);
})

return subscriptionStatus;
}


exports.SubscriptionStatusTrans=SubscriptionStatusTrans;
exports.UpdateSubscriptionStatusTrans=UpdateSubscriptionStatusTrans;