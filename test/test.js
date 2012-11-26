var s3LogParser = require('../index')
  , assert = require('assert')
  , sampleLog = require('./sample')
  , parsedLog = s3LogParser.parse(sampleLog)
  ;

assert.equal(parsedLog.length, 7);
