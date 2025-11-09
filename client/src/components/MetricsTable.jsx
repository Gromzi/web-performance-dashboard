export default function MetricsTable({ data, metrics }) {
  const metricStyles = {
    lcp: {
      color: "rgba(0, 123, 255, 0.9)",
      background: "rgba(0, 123, 255, 0.15)",
      borderWidth: 2,
      textAlign: "center",
    },
    fid: {
      color: "rgba(40, 167, 69, 0.9)",
      background: "rgba(40, 167, 69, 0.15)",
      borderWidth: 2,
      textAlign: "center",
    },
    cls: {
      color: "rgba(88, 83, 3, 0.77)",
      background: "rgba(255, 193, 7, 0.15)",
      borderWidth: 2,
      textAlign: "center",
    },
    ttfb: {
      color: "rgba(220, 53, 69, 0.9)",
      background: "rgba(220, 53, 69, 0.15)",
      borderWidth: 2,
      textAlign: "center",
    },
  }

  return (
    <table border="1" style={{ width: "100%", marginTop: "1rem" }}>
      <thead>
        <tr>
          <th style={{ width: "150px" }}>Time (HH:MM:SS)</th>
          {metrics.map((metric) => {
            return (
              <th style={metricStyles[metric]}>{`${metric.toUpperCase()} ${
                metric !== "cls" ? "(ms)" : ""
              }`}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((m, i) => (
          <tr key={i}>
            <td style={{ textAlign: "center" }}>
              {new Date(m.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </td>
            {metrics.map((metric) => {
              return <td style={metricStyles[metric]}>{m[metric]}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
