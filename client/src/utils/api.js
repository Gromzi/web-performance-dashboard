export const fetchMetrics = async () => {
  const res = await fetch("http://localhost:4000/api/metrics")
  return res.json()
}

export const fetchReports = async () => {
  const res = await fetch("http://localhost:4000/api/reports")
  const data = await res.json()
  return JSON.parse(data)
}
