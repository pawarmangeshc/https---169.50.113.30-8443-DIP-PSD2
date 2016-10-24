'use strict';
/*
 * Copyright (c) 2015 TD Bank Financial Group. All Rights Reserved.
 *
 * THIS INFORMATION IS COMPANY CONFIDENTIAL.
 *
 * NOTICE:  This material is a confidential trade secret and proprietary
 * information of TD Bank Financial Group which may not be reproduced, used,
 * sold, or transferred to any third party without the prior written consent
 * of TD Bank Financial Group.
 */
var util = require('util');
//var loggerManager = require('td-api-common-logger');
//var metadata = {'filename': 'apperrorhandler.js'};
//var logger = loggerManager.getLogger('adapters');

var APPCONFIG=require('../../common/config/appconfig');
//var APPCONFIG = config._appConfig;

var SUCCESSCODE = "success";
var WARNINGCODE = "warning";
var ERRORCODE = "error";
var ENABLESTACKERROR = true;
var APPERRORS = APPCONFIG.statusHandler.error;

/**
 * [convertStackToArray add line break to make the stack more readiable]
 * @param  {[type]}stack   [the origin stack]
 */
var convertStackToArray = function(stack) {
  var method = 'convertStackToArray';

  return stack.replace(/^[^\(]+?[\n$]/gm, '')
      .replace(/^\s+at\s+/gm, '')
      .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
      .split('\n');
};
/**
 * [appendAdditionalStatus Creates a new additionalStatus object in Error obejct]
 * @param  {[type]}httpCode             [statusCode field]
 * @param  {[type]}serverStatusCode     [serverStatusCode field]
 * @param  {[type]}data                 [data object or description to be added into statusDesc field]
 */
var appendAdditionalStatus = function(httpCode, serverStatusCode, data) {
  var method = 'appendAdditionalStatus';

  if(data && typeof data === 'object' && data.additionalStatus) {
    return data.additionalStatus;
  }
  return [{
    'severity': 'Error',
    'statusCode': '' + httpCode,
    'serverStatusCode': serverStatusCode,
    'statusDesc': data
  }];
};
/**
 * [getAdditionalStatus Add a set of new additionalStatus to the array of additionalStatus]
 * @param  {[type]}httpCode         [additionalStatus statusCode]
 * @param  {[type]}message          [additionalStatus statusDesc if the data is message]
 * @param  {[type]}stack            [additionalStatus statusDesc if the data is stack]
 * @param  {[type]}serverStatusCode [additionalStatus serverStatusCode]
 * @param  {[type]}statusDesc       [additionalStatus statusDesc]
 */
var getAdditionalStatus = function(httpCode, message, stack, serverStatusCode, statusDesc) {
  var method = 'getAdditionalStatus';

  var additionalStatus = [{
    'severity': 'Error',
    'statusCode': '' + httpCode,
    'serverStatusCode': serverStatusCode,
    'statusDesc': message
  }];

  if (stack !== '' && ENABLESTACKERROR) {
    additionalStatus.push({
      'severity': 'Error',
      'statusCode': '' + httpCode,
      'serverStatusCode': 'STACK',
      'statusDesc': stack
    });
  }
  return additionalStatus.concat(appendAdditionalStatus(httpCode, serverStatusCode, statusDesc));
};
/**
 * [CommonApplicationError Create API Error object based on error code]
 * @param  {[type]}errorcode          [the errorcode defined in appConfig.json]
 * @param  {[type]}additionalMessage  [additionalMessage to default error message]
 * @param  {[type]}data               [data to be added into additionalStatus]
 * @param  {[type]}appcode            [if the backend provides appcode, use it as serverStatusCode]
 */
var CommonApplicationError = function(errorcode, additionalMessage, data, appcode) {
  var method = 'CommonApplicationError';

  Error.call(this);
  Error.captureStackTrace(this, this.constructor);

  var errStatus = {};
  var message = '';
  var name = '';

  if (APPERRORS[errorcode] !== undefined) {
    name = APPERRORS[errorcode].name;
    message = APPERRORS[errorcode].statusDesc;
    errStatus.serverStatusCode = '' + APPERRORS[errorcode].httpcode;
    errStatus.severity = APPERRORS[errorcode].severity;
  }
  else {
    name = APPERRORS.EXE000.name;
    message = APPERRORS.EXE000.statusDesc;

    errStatus.serverStatusCode = '' + APPERRORS.EXE000.httpcode;
    errStatus.severity = APPERRORS.EXE000.severity;
  }
  var _message = '' + name + ' - ' + message + ': ' + additionalMessage;
  var stack = convertStackToArray(this.stack);
  // If the backend system returns return/reason code, use them as the errorcode in additionalstatus
  var additionalstatuserrorcode = appcode || errorcode || 'EXE000';
  errStatus.additionalStatus = getAdditionalStatus(errStatus.serverStatusCode, _message, stack, additionalstatuserrorcode, data);

  this.status = errStatus;

  //logger.error(errorcode, name, this, method);
  delete this.stack;
};
/**
 * [isValidResponseCode Validate whether the response from the backend system contains return_code and reason_code]
 * @param  {[type]}data       [Response Data]
 * @param  {[type]}prefix     [The backend system field name prefix]
 */
var isValidResponseCode = function(data, prefix) {
  var method = 'isValidResponseCode';
  if (data[prefix+'__return__code'] === undefined || data[prefix+'__resn__code'] === undefined) {
    throw new CommonApplicationError('EXE001', ' ' + prefix + '__return__code', data);
  }
  else {
    var appcode = '' + data[prefix + '__return__code']; // covert appcode from number to string
    logger.info('Response App Code: ', appcode, prefix, method);
    var idxs = SUCCESSCODE.indexOf(appcode);
    var idxw = WARNINGCODE.indexOf(appcode);
    var idxe = ERRORCODE.indexOf(appcode);
    logger.debug('SUCCESSCODE idxs: ', idxs, 'WARNINGCODE idxw: ', idxw, 'ERRORCODE idxe: ', idxe, method);
    if (idxs !== -1 || idxw !== -1) {
      logger.info('Successful appCode: ', appcode, method);
      return true;
    } else if (idxe !== -1) {
      var statusObject = APPCONFIG.statusHandler.error[ERRORCODE[idxe]];
      logger.debug('statusObject: ', statusObject, method);
      var message = statusObject.severity + ': ' + statusObject.statusDesc;
      throw new CommonApplicationError(appcode, message, data, Number(appcode));
    } else {
      throw new CommonApplicationError('-1', prefix+'__return__code' + ': ' + data[prefix+'__return__code'],
        data, appcode);
    }
    return false;
  }
};

util.inherits(CommonApplicationError, Error);
exports.isValidResponseCode = isValidResponseCode;
exports.CommonApplicationError = CommonApplicationError;
