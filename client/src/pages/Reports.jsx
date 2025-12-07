import { useEffect, useState } from "react"
import { fetchReports } from "../utils/api"

export default function Reports() {
  const [report, setReport] = useState({})

  useEffect(() => {
    fetchReports().then(setReport)
  })

  return (
    <div
      style={{ marginTop: "5rem", backgroundColor: "#fff", padding: "1rem" }}
    >
      <h2>Average Metrics Report</h2>
      <p>LCP: {report.avgLCP ? report.avgLCP.toFixed(2) : "Loading..."} ms</p>
      <p>FID: {report.avgFID ? report.avgFID.toFixed(2) : "Loading..."} ms</p>
      <p>CLS: {report.avgCLS ? report.avgCLS.toFixed(2) : "Loading..."} </p>
    </div>
  )
}
