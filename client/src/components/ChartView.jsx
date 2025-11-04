import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js"
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement)

export default function ChartView({ data }) {
  const chartData = {
    labels: data.map((d) => d.page),
    datasets: [
      {
        label: "LCP (ms)",
        data: data.map((d) => d.lcp),
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  }

  return <Line data={chartData} />
}
