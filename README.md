# dynamic-factor [![npm version](https://img.shields.io/npm/v/dynamic-factor.svg?style=flat)](https://www.npmjs.com/package/dynamic-factor) [![NPM](https://img.shields.io/npm/dt/dynamic-factor.svg?style=flat-square&colorB=fd7463)](https://www.npmjs.com/package/dynamic-factor) <a href="https://travis-ci.org/greatjapa/dynamic-factor"><img alt="Travis Status" src="https://travis-ci.org/greatjapa/dynamic-factor.svg?branch=master"></a> [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](https://github.com/greatjapa/dynamic-factor/blob/master/LICENSE)

Dynamic factor library provides a easy way to calculate factor that may change over time, for instance, factors based on page views, number of downloads, number of logged users and so on. Those factors are helpful into dynamic pricing, heatmap, realtime statistics, etc.


## How to install?
```bash
npm i --save dynamic-factor
```

## How to use?

```javascript
const Dynamic = require('dynamic-factor');

let perMinute = new Dynamic(60, 10); // ttl set to 1min, denominator = 10
console.info(perMinute.get("page_views"))    // undefined
console.info(perMinute.factor("page_views")) // 0

perMinute.set("page_views", 100)
console.info(perMinute.get("page_views"))    // 100
console.info(perMinute.factor("page_views")) // 10

perMinute.inc("page_views")
console.info(perMinute.get("page_views"))    // 101
console.info(perMinute.factor("page_views")) // 10.1

perMinute.inc("page_views", 2)
console.info(perMinute.get("page_views"))    // 103
console.info(perMinute.factor("page_views")) // 10.3

// 1 minute without changes

console.info(perMinute.get("page_views"))    // undefined
console.info(perMinute.factor("page_views")) // 0
```

The example above shows how to use `Dynamic` class to calculate `page_views` factor. Note that the `page_views` key will be expired in 1 minute after the last change.  
