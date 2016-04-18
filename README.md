
### Basic Usage

```javascript
var s3LogParser = require('s3-log-parser');
s3LogParser.parse(textOfLog, function(err, parsedLog){
  //Do Something with parsedLog
});
```

The parser will return an array of objects that represent a s3 parsed
log.
