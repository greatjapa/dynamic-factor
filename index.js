const NodeCache = require( "node-cache" );

class Dynamic {

    constructor(ttl_sec = 10, denominator = 10) {
      if (!Number.isInteger(ttl_sec)) {
        throw Error("ttl_sec should be integer")
      }
      if (!Number.isInteger(denominator)) {
        throw Error("denominator should be integer")
      }
      this.ttl_sec = ttl_sec
      this.denominator = denominator
      this.cache = new NodeCache()
    }

    inc(key, value=1) {
      if (!Number.isInteger(value)) {
        throw Error("value should be integer")
      }
      this.set(key, (this.cache.get(key) || 0) + value)
    }

    decr(key, value=1) {
      if (!Number.isInteger(value)) {
        throw Error("value should be integer")
      }
      this.set(key, (this.cache.get(key) || 0) - value)
    }

    set(key, value) {
      if (!Number.isInteger(value)) {
        throw Error("value should be integer")
      }
      this.cache.set(key, value, this.ttl_sec)
    }

    get(key) {
      return this.cache.get(key)
    }

    factor(key) {
      let value = this.cache.get(key)
      if (value == undefined) {
        return 0;
      }
      return value / this.denominator
    }
}

module.exports = Dynamic