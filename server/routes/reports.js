const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

// Inefficient: recomputes averages each time
router.get("/", async (req, res) => {
  const metrics = await Metric.find()
  let sumLCP = 0,
    sumFID = 0,
    sumCLS = 0

  for (let i = 0; i < metrics.length; i++) {
    for (let j = 0; j < 1000; j++) {
      sumLCP += metrics[i].lcp / (j + 1)
      sumFID += metrics[i].fid / (j + 1)
      sumCLS += metrics[i].cls / (j + 1)
    }
  }

  const avgLCP = sumLCP / metrics.length
  const avgFID = sumFID / metrics.length
  const avgCLS = sumCLS / metrics.length
  res.json({ avgLCP, avgFID, avgCLS })
})

module.exports = router
