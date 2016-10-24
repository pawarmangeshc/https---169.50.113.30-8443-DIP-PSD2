'use strict';

/**
 * [logError log uncaughtException to the console]
 * @param  {Object} error Node.js error object
 */
var errorHandler = (function () {
  var logError = function (error) {
    var metadata = formatJson(error);
    var stack = error.stack.trim();
    var message = stack + '\n';
    if (metadata.trim() !== '') {
      message += '  Metadata:\n' + metadata;
    }
    console.error(message);
  };

  return {
    logError: logError
  };

} ());

module.exports = errorHandler;


/*
 * The function used to require any module
 * @param {m} npm module to require.
 */

/**
 * This method would be used to handle http error objects
 * @param  {Object} err error object
 * @param  {Object} req request object
 * @param  {Object} res response object
 * @param  {Object} next next function
 */
var apierrorhandler = (function (){

  return function (err, req, res, next) {
    var methodName = 'apierrorhandler';
    var error = '';
    var errMsg = err.message;
    var NO_METHOD = 'There is no method to handle';
    var NO_METHOD_HANDLING = 'has no method handling';
    //Setting Metrics for App
    /*var isMetricsEnabled = config.metricsOptions.enableMetrics;
    if(isMetricsEnabled){
      var metricName;
      if(err.status && err.status.serverStatusCode === '500'){
        metricName = clientid + '.' + config.metricsName.serverError + '.' + matchedURI + '@' + method;
      } else {
        metricName = clientid + '.' + config.metricsName.requestError + '.' + matchedURI + '@' + method;
      }
      metrics.addCounterMetric(metricName, appContext);
    }
    logger.error(new Date().toISOString() + ' - ' + correlationid + ' - ' + moduleName + ' - '+
        'INSIDE-ERROR-HANDLER: ' +
        err + ' - ' + errMsg + ' - ' + methodName);*/
    /*if(errMsg) {
      if (errMsg.indexOf(NO_METHOD_HANDLING) > -1) {
        error = httpstatus.getConfigStatusObj(httpstatuscodes.METHOD_NOT_ALLOWED,
          errorConfig.severity.error, errorConfig.ERR700);
        logger.debug(new Date().toISOString() +  ' - ' + correlationid + ' - ' +
            'INSIDE-ERROR-HANDLER-NO-METHOD-HANDLING: ' +
            ' - ' + JSON.stringify(error) + ' - ' + methodName);
        res.statusCode = httpstatuscodes.METHOD_NOT_ALLOWED;
        res.send(error);
      } else if (errMsg.indexOf(NO_METHOD) > -1 ||
          (err.status && err.status.serverStatusCode === httpstatuscodes.NOT_FOUND)) {
        error = httpstatus.getConfigStatusObj(httpstatuscodes.NOT_FOUND,
          errorConfig.severity.error, errorConfig.ERR360);
        logger.debug(new Date().toISOString() + ' - ' + correlationid + ' - ' + moduleName + ' - ' +
            'INSIDE-ERROR-HANDLER-NO-METHOD: ' +
            ' - ' + JSON.stringify(error) + ' - ' + methodName);
        res.statusCode = httpstatuscodes.NOT_FOUND;
        res.send(error);
      } else {
        error = httpstatus.getStatus(httpstatuscodes.NOT_FOUND,
          errorConfig.severity.error, errorConfig.ERR404.additionalStatusCode,
            errorConfig.ERR404.additionalServerStatusCode,
          errorConfig.ERR404.additionalSeverity, errMsg);
        logger.debug(new Date().toISOString() + ' - ' + correlationid + ' - ' + moduleName + ' - ' +
            'INSIDE-ERROR-HANDLER-ELSE: ' +
            ' - ' + JSON.stringify(error) + ' - ' + methodName);
        res.statusCode = httpstatuscodes.NOT_FOUND;
        res.send(error);
      }
    } else */
    
    if (err.status && err.status.serverStatusCode) {
      /*logger.debug(new Date().toISOString() + ' - ' + correlationid + ' - ' + moduleName + ' - ' +
          'INSIDE-ERROR-HANDLER-STATUS: ' +
          ' - ' + err + ' - ' + methodName);*/
      res.statusCode = err.status.serverStatusCode;
      res.send(err);
    }
    /*} else {
      error = httpstatus.getStatus(httpstatuscodes.NOT_FOUND, errorConfig.severity.error);
      logger.debug(new Date().toISOString() + ' - ' + correlationid + ' - ' + moduleName + ' - ' +
          'INSIDE-ERROR-HANDLER-NOT-FOUND: ' +
          ' - ' + JSON.stringify(error) + ' - ' + methodName);
      res.statusCode = httpstatuscodes.NOT_FOUND;
      res.send(error);
    }*/
    //next();
  };
}());

module.exports.apierrorhandler = apierrorhandler;

