import { useEffect, useMemo, useState, useCallback } from "react"
import { fetchMetrics } from "../utils/api"
import ChartView from "../components/ChartView"
import MetricSelector from "../components/MetricSelector"

export default function Dashboard() {
  const [metrics, setMetrics] = useState([])
  const [selectedPage, setSelectedPage] = useState("Home")
  const [selectedMetrics, setSelectedMetrics] = useState([
    "lcp",
    "fid",
    "cls",
    "ttfb",
  ])
  const [selectedDate, setSelectedDate] = useState("2025-11-04")
  const [filteredData, setFilteredData] = useState([])
  const [result, setResult] = useState(null)

  // console.log("Dashboard rendered")

  useEffect(() => {
    const heavyComputation = (arr) => {
      let sum = 0
      for (let i = 0; i < 5000000; i++) {
        sum += Math.sqrt(i) * Math.random()
      }
      return sum + arr.length
    }

    const interval = setInterval(() => {
      fetchMetrics()
        .then(setMetrics)
        .then(() => {
          setResult(heavyComputation(metrics))
        })
    }, 3000)

    return () => clearInterval(interval)
  })

  const pageOptions = [...new Set(metrics.map((m) => m.page))]
  // const metricOptions = useMemo(() => ["lcp", "fid", "cls", "ttfb"], [])
  const metricOptions = ["lcp", "fid", "cls", "ttfb"]

  useEffect(() => {
    if (!selectedPage || selectedMetrics.length === 0 || !selectedDate) {
      setFilteredData([])
      return
    }

    const filtered = metrics
      .filter((m) => m.page === selectedPage)
      .filter((m) => {
        const dateStr = new Date(m.timestamp).toISOString().slice(0, 10)
        return dateStr === selectedDate
      })
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))

    setFilteredData(filtered)
  }, [metrics, selectedPage, selectedMetrics, selectedDate])

  const ready = selectedPage && selectedMetrics.length > 0 && selectedDate

  return (
    <div
      style={{ marginTop: "5rem", padding: "1rem", backgroundColor: "#fff" }}
    >
      <h1>Web Performance Dashboard. Result: {result}</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Page Selector */}
        <label>
          Page:
          <select
            value={selectedPage}
            onChange={(e) => setSelectedPage(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          >
            <option value="">-- Select Page --</option>
            {pageOptions.map((page) => (
              <option key={page} value={page}>
                {page}
              </option>
            ))}
          </select>
        </label>

        {/* Metric Selector */}
        <MetricSelector
          metrics={metricOptions}
          selectedMetrics={selectedMetrics}
          onChange={setSelectedMetrics}
        />

        {/* Date Selector */}
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              console.log("date", e.target.value)
              setSelectedDate(e.target.value)
            }}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>
      </div>

      {ready ? (
        filteredData.length > 0 ? (
          <ChartView
            data={filteredData}
            metrics={selectedMetrics}
            page={selectedPage}
          />
        ) : (
          <p>No data for selected parameters.</p>
        )
      ) : (
        <p>Please select a page, metric, and date to visualize data.</p>
      )}
    </div>
  )
}
