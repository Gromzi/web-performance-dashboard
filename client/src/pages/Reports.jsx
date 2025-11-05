import { useEffect, useState } from "react"
import { fetchReports } from "../utils/api"

export default function Reports() {
  const [report, setReport] = useState({})

  // infinite re-fetch
  useEffect(() => {
    fetchReports().then(setReport)
  })

  return (
    <div
      style={{ marginTop: "5rem", backgroundColor: "#fff", padding: "1rem" }}
    >
      <h2>Average Metrics Report</h2>
      <p>LCP: {report.avgLCP?.toFixed(2)} ms</p>
      <p>FID: {report.avgFID?.toFixed(2)} ms</p>
      <p>CLS: {report.avgCLS?.toFixed(2)}</p>
    </div>
  )
}
