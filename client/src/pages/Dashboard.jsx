import { useEffect, useState } from "react"
import { fetchMetrics } from "../utils/api"
import MetricsTable from "../components/MetricsTable"
import ChartView from "../components/ChartView"

export default function Dashboard() {
  const [metrics, setMetrics] = useState([])

  // 🚨 Suboptimal: no dependency array -> causes infinite re-fetch
  useEffect(() => {
    fetchMetrics().then(setMetrics)
  }, [])

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Web Performance Dashboard</h1>
      <ChartView data={metrics} />
      <MetricsTable data={metrics} />
    </div>
  )
}
