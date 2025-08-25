/**
 * Simple in-memory LRU cache implementation
 */
class LRUCache {
  constructor(maxSize = 100) {
    this.maxSize = maxSize
    this.cache = new Map()
  }

  get(key) {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
      return value
    }
    return null
  }

  set(key, value, ttl = 300000) {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    // Set expiry timer
    const expiryTimer = setTimeout(() => {
      this.cache.delete(key)
    }, ttl)

    this.cache.set(key, { data: value, timer: expiryTimer })
  }

  delete(key) {
    if (this.cache.has(key)) {
      const item = this.cache.get(key)
      if (item.timer) {
        clearTimeout(item.timer)
      }
      this.cache.delete(key)
    }
  }

  clear() {
    // Clear all timers
    for (const item of this.cache.values()) {
      if (item.timer) {
        clearTimeout(item.timer)
      }
    }
    this.cache.clear()
  }

  invalidateByPattern(pattern) {
    const regex = new RegExp(pattern)
    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.delete(key)
      }
    }
  }
}

// Global cache instance
export const cache = new LRUCache(200)

/**
 * Cache middleware for GET requests
 */
export const cacheMiddleware = (keyPrefix, ttl = 300000) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next()
    }

    const cacheKey = `${keyPrefix}:${req.originalUrl}`
    const cachedData = cache.get(cacheKey)

    if (cachedData) {
      return res.json(cachedData.data)
    }

    // Store original json method
    const originalJson = res.json
    res.json = function (data) {
      // Cache the response
      cache.set(cacheKey, data, ttl)
      
      // Set cache headers
      res.set({
        'Cache-Control': `public, max-age=${Math.floor(ttl / 1000)}`,
        'ETag': `"${Buffer.from(JSON.stringify(data)).toString('base64')}"`,
      })

      // Call original json method
      return originalJson.call(this, data)
    }

    next()
  }
}

/**
 * Invalidate cache entries by pattern
 */
export const invalidateCache = (pattern) => {
  cache.invalidateByPattern(pattern)
}