"use strict";

function parse(log, cb) {
  var logs = log.split('\n')
    , parsedLogs = []
    , bracketRegEx = /\[(.*?)\]/
    , quoteRegex = /\"(.*?)\"/
    ;


  for(var i = 0; i < logs.length; i++) {
    var logString = logs[i];
    if(logString.length == 0) continue;
    var time = bracketRegEx.exec(logString)[1];
    time = time.replace(/\//g, ' ');
    time = time.replace(/:/, ' ');
    time = new Date(time);
    logString = logString.replace(bracketRegEx, '');

    var requestUri = quoteRegex.exec(logString)[1];
    logString = logString.replace(quoteRegex, '');

    var referrer = quoteRegex.exec(logString)[1];
    logString = logString.replace(quoteRegex, '');

    var userAgent = quoteRegex.exec(logString)[1];
    logString = logString.replace(quoteRegex, '');

    var logStringSplit = logString.split(' ')
      , bucketOwner    = logStringSplit[0]
      , bucket         = logStringSplit[1]
      , remoteIp       = logStringSplit[3]
      , requestor      = logStringSplit[4]
      , requestId      = logStringSplit[5]
      , operation      = logStringSplit[6] + ' ' + logStringSplit[7]
      , statusCode     = logStringSplit[9]
      , errorCode      = logStringSplit[10]
      , bytesSent      = logStringSplit[11]
      , objectSize     = logStringSplit[12]
      , totalTime      = logStringSplit[13]
      , turnAroundTime = logStringSplit[14]
      , ctime          = logStringSplit[17]
      ;

    var log = {
      bucketOwner:    bucketOwner,
      bucket:         bucket,
      time:           time,
      remoteIp:       remoteIp,
      requestor:      requestor,
      requestId:      requestId,
      operation:      operation,
      requestUri:     requestUri,
      statusCode:     (statusCode == '-' ? statusCode : parseInt(statusCode, 10)),
      errorCode:      errorCode,
      bytesSent:      (bytesSent == '-' ? bytesSent : parseInt(bytesSent, 10)),
      objectSize:     (objectSize == '-' ? objectSize : parseInt(objectSize, 10)),
      totalTime:      (totalTime == '-' ? totalTime : parseInt(totalTime, 10)),
      turnAroundTime: (turnAroundTime == '-' ? turnAroundTime : parseInt(turnAroundTime, 10)),
      referrer:       referrer,
      userAgent:      userAgent,
      ctime:          ctime
    }

    parsedLogs.push(log);
  };

  cb(null, parsedLogs);
}

module.exports = {
  parse: parse
}
