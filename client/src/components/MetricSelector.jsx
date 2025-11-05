import React from "react"

function MetricSelector({ metrics, selectedMetrics, onChange }) {
  const handleToggle = (metric) => {
    if (selectedMetrics.includes(metric)) {
      onChange(selectedMetrics.filter((m) => m !== metric))
    } else {
      onChange([...selectedMetrics, metric])
    }
  }

  console.log("MetricSelector rendered")

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <label>Metrics:</label>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.25rem",
          flexWrap: "wrap",
        }}
      >
        {metrics.map((metric) => (
          <label
            key={metric}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              cursor: "pointer",
              userSelect: "none",
              background: selectedMetrics.includes(metric)
                ? "rgba(0, 123, 255, 0.1)"
                : "transparent",
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "0.25rem 0.5rem",
              transition: "all 0.15s ease",
            }}
          >
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => handleToggle(metric)}
            />
            {metric.toUpperCase()}
          </label>
        ))}
      </div>
    </div>
  )
}

// export default React.memo(MetricSelector)
export default MetricSelector
