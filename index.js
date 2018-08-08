const NodeCache = require( "node-cache" );

class Dynamic {

    constructor(ttl_sec = 10, limit = 10) {
      if (!Number.isInteger(ttl_sec)) {
        throw Error("ttl_sec should be integer")
      }
      if (!Number.isInteger(limit)) {
        throw Error("limit should be integer")
      }
      this.ttl_sec = ttl_sec
      this.limit = limit
      this.cache = new NodeCache()
    }

    inc(key) {
      this.set(key, (this.cache.get(key) || 0) + 1)
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
      let count = this.cache.get(key)
      if (count == undefined || count <= this.limit) {
        return 1;
      }
      return count / this.limit
    }
}

module.exports = Dynamic