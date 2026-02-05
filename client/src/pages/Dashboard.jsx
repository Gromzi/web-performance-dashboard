import { useEffect, useState, useMemo } from "react"
import { fetchMetrics } from "../utils/api"
import ChartView from "../components/ChartView"
import MetricSelector from "../components/MetricSelector"
import MetricsTable from "../components/MetricsTable"
import "../dashboard.css"
import "../styles.css"

export default function Dashboard() {
  const [metrics, setMetrics] = useState([])
  const [selectedPage, setSelectedPage] = useState("")
  const [selectedMetrics, setSelectedMetrics] = useState([])
  const [selectedDate, setSelectedDate] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [result, setResult] = useState(null)
  const [showBanner, setShowBanner] = useState(true)
  const [showInsights, setShowInsights] = useState(true)
  const [bannerLoading, setBannerLoading] = useState(true)
  const [insightsLoading, setInsightsLoading] = useState(true)

  const [refreshLoading, setRefreshLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setBannerLoading(false)
    }, 800)

    setTimeout(() => {
      setInsightsLoading(false)
    }, 1200)
  }, [])

  // useEffect(() => {
  //   requestMetrics()
  // }, [])

  const heavyComputation = (arr) => {
    let sum = 0
    for (let i = 0; i < 5000000; i++) {
      sum += Math.sqrt(i) * Math.random()
    }
    return sum + arr.length
  }

  const requestMetrics = async () => {
    setRefreshLoading(true)

    try {
      const newMetrics = await fetchMetrics({
        page: selectedPage,
        date: selectedDate,
      })

      setMetrics(newMetrics)
      setResult(heavyComputation(newMetrics))
    } catch (error) {
      console.error("Failed to fetch metrics:", error)
    } finally {
      setRefreshLoading(false)
    }
  }

  const pageOptions = useMemo(
    () => ["Home", "About", "Dashboard", "Contact", "Settings", "Profile"],
    []
  )
  const metricOptions = useMemo(() => ["lcp", "fid", "cls", "ttfb"], [])

  useEffect(() => {
    setFilteredData(metrics)
  }, [metrics])

  const ready = selectedPage && selectedMetrics.length > 0

  return (
    <div className="dashboard-page">
      <div
        className="dashboard-banner"
        style={{ display: showBanner ? "flex" : "none" }}
      >
        {!bannerLoading ? (
          <>
            <strong>Performance update</strong>
            <p>
              New performance metrics were collected and recalculated based on
              the latest dataset. Chart values may differ from previous results.
            </p>

            <p
              onClick={() => setShowBanner(false)}
              style={{
                marginTop: "1rem",
                color: "rgb(204, 58, 58)",
                cursor: "pointer",
                textDecorationLine: "underline",
              }}
            >
              Discard
            </p>
          </>
        ) : (
          <div className="loader"></div>
        )}
      </div>

      <div
        className="insights-banner"
        style={{ display: showInsights ? "flex" : "none" }}
      >
        {!insightsLoading ? (
          <>
            <h2>AI Insights</h2>
            <p>
              Based on recent data, performance degradation was detected on
              mobile devices.
            </p>

            <p
              onClick={() => setShowInsights(false)}
              style={{
                marginTop: "1rem",
                color: "rgb(204, 58, 58)",
                cursor: "pointer",
                textDecorationLine: "underline",
              }}
            >
              Discard
            </p>
          </>
        ) : (
          <div className="loader"></div>
        )}
      </div>

      <h1>{`Web Performance Dashboard.${
        result ? ` Some computation ${result}` : ""
      }`}</h1>
      <div style={{ display: "flex", gap: "20px" }}>
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

        {/* Date Selector */}
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
            }}
            style={{ marginLeft: "0.5rem" }}
          />
        </label>

        <button
          onClick={requestMetrics}
          disabled={refreshLoading || !ready}
          style={{ marginBottom: "1rem" }}
        >
          Request new data
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
        }}
      >
        {/* Metric Selector */}
        <MetricSelector
          metrics={metricOptions}
          selectedMetrics={selectedMetrics}
          onChange={setSelectedMetrics}
        />
      </div>
      {ready ? (
        filteredData.length > 0 ? (
          <>
            <ChartView data={filteredData} metrics={selectedMetrics} />

            <MetricsTable data={filteredData} metrics={selectedMetrics} />
          </>
        ) : (
          <p>
            No data for selected parameters. Try requesting new data with
            different parameters.
          </p>
        )
      ) : (
        <p>Please select a page, metric, and date to visualize data.</p>
      )}
    </div>
  )
}
