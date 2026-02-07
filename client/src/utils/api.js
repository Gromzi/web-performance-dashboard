const cache = new Map()

export const fetchMetrics = async () => {
  const cacheKey = "metrics"
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const res = await fetch("http://localhost:4000/api/metrics")
  const data = await res.json()
  cache.set(cacheKey, data)

  // Clear cache after 5 minutes
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000)

  return data
}

export const fetchReports = async () => {
  const cacheKey = "reports"
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  const res = await fetch("http://localhost:4000/api/reports")
  const data = await res.json()
  cache.set(cacheKey, data)

  // Clear cache after 5 minutes
  setTimeout(() => cache.delete(cacheKey), 5 * 60 * 1000)

  return data
}
