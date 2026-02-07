export const fetchMetrics = async ({ page, date }) => {
  const params = new URLSearchParams({ page, date })

  const res = await fetch(
    `http://localhost:4000/api/metrics?${params.toString()}`
  )

  return res.json()
}

export const fetchReports = async () => {
  const res = await fetch("http://localhost:4000/api/reports")
  return res.json()
}
