"use strict";

var parse = function(log) {
  var logs = log.split('\n')
    , parsedLogs = []
    , bracketRegEx = /\[(.*?)\]/
    , quoteRegex = /\"(.*?)\"/
    ;

  logs.forEach(function(logString, index) {
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

    var logStringSplit = logString.split(' ');

    var log = {
      bucketOwner:    logStringSplit[0],
      bucket:         logStringSplit[1],
      time:           time,
      remoteIp:       logStringSplit[3],
      requestor:      logStringSplit[4],
      requestId:      logStringSplit[5],
      operation:      logStringSplit[6],
      requestUri:     requestUri,
      httpStatus:     logStringSplit[9],
      errorCode:      logStringSplit[10],
      bytesSent:      logStringSplit[11],
      objectSize:     logStringSplit[12],
      totalTime:      logStringSplit[13],
      turnAroundTime: logStringSplit[14],
      referrer:       referrer,
      userAgent:      userAgent,
      ctime:          logStringSplit[17]
    }

    parsedLogs.push(log);
  });

  return parsedLogs;
}

module.exports = {
  parse: parse
}
