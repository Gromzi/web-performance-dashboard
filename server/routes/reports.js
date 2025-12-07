const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

// Intentionally terrible reporting route
router.get("/", async (req, res) => {
  // Fetch all metrics (no filtering, no pagination)
  const metrics = await Metric.find()

  // Extreme CPU work: O(n²) nested loop
  let sumLCP = 0,
    sumFID = 0,
    sumCLS = 0

  for (let i = 0; i < metrics.length; i++) {
    for (let j = 0; j < metrics.length; j++) {
      sumLCP += metrics[i].lcp / (j + 1)
      sumFID += metrics[i].fid / (j + 1)
      sumCLS += metrics[i].cls / (j + 1)
    }
  }

  const avgLCP = sumLCP / metrics.length
  const avgFID = sumFID / metrics.length
  const avgCLS = sumCLS / metrics.length

  // Simulate slow JSON serialization (double stringify)
  const output = JSON.stringify({ avgLCP, avgFID, avgCLS })
  const doubleSerialized = JSON.stringify(output)

  res.setHeader("Content-Type", "application/json")
  res.send(doubleSerialized)
})

module.exports = router
