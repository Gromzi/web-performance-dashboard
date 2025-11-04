import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

export default function ChartView({ data, metrics, page }) {
  // Downsample for readability (still fetches all)
  const MAX_POINTS = 250
  const sortedData = [...data].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  )
  const step = Math.max(1, Math.floor(sortedData.length / MAX_POINTS))
  const reducedData = sortedData.filter((_, i) => i % step === 0)

  const labels = reducedData.map((d) =>
    new Date(d.timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  )

  const metricStyles = {
    lcp: {
      color: "rgba(0, 123, 255, 0.9)",
      background: "rgba(0, 123, 255, 0.15)",
      borderWidth: 2,
    },
    fid: {
      color: "rgba(40, 167, 69, 0.9)",
      background: "rgba(40, 167, 69, 0.15)",
      borderWidth: 2,
    },
    cls: {
      color: "rgba(255, 193, 7, 0.9)",
      background: "rgba(255, 193, 7, 0.15)",
      borderWidth: 2,
    },
    ttfb: {
      color: "rgba(220, 53, 69, 0.9)",
      background: "rgba(220, 53, 69, 0.15)",
      borderWidth: 2,
    },
  }

  // Build multiple datasets dynamically
  const datasets = metrics.map((metric) => {
    const style = metricStyles[metric] || metricStyles.lcp
    return {
      label: `${metric.toUpperCase()} for ${page}`,
      data: reducedData.map((d) => d[metric]),
      borderColor: style.color,
      backgroundColor: style.background,
      borderWidth: style.borderWidth,
      pointRadius: 0,
      tension: 0.3,
    }
  })

  const chartData = {
    labels,
    datasets,
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        ticks: { maxTicksLimit: 10 },
        title: { display: true, text: "Time (HH:MM:SS)" },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Metric Value" },
      },
    },
  }

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        background: "#1f1818ff",
        padding: "1rem",
        boxSizing: "border-box",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  )
}
