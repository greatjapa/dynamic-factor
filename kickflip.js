const NodeCache = require( "node-cache" );

class Kickflip {

    constructor(ttl_sec = 10, limit = 10) {
      this.ttl_sec = ttl_sec
      this.limit = limit
      this.cache = new NodeCache()
    }

    inc(key) {
      let count = this.cache.get(key) || 0
      this.cache.set(key, count + 1, this.ttl_sec)
    }

    get(key) {
      return this.cache.get(key)
    }

    factor(key) {
      let count = this.cache.get(key)
      if (count == undefined || count <= this.limit) {
        return 1;
      }
      return Math.round(count / this.limit)
    }
}

module.exports = Kickflip