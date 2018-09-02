# dynamic-factor [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/greatjapa/dynamic-factor/blob/master/LICENSE)


## How to use?
```bash
npm install --save https://github.com/greatjapa/dynamic-factor.git
```

```javascript
const Dynamic = require('dynamic-factor');

let perMinute = new Dynamic(60, 10); // ttl_sec = 60 and denominator = 10
console.info(perMinute.get("page_views")) // 0

perMinute.set("page_views", 100)
console.info(perMinute.get("page_views")) // 10

perMinute.inc("page_views")
console.info(perMinute.get("page_views")) // 10.1
```
