const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

router.get("/", async (req, res) => {
  const metrics = await Metric.find()

  let sumLCP = 0,
    sumFID = 0,
    sumCLS = 0

  for (let i = 0; i < metrics.length; i++) {
    sumLCP += metrics[i].lcp
    sumFID += metrics[i].fid
    sumCLS += metrics[i].cls
  }

  const avgLCP = sumLCP / metrics.length
  const avgFID = sumFID / metrics.length
  const avgCLS = sumCLS / metrics.length

  res.setHeader("Content-Type", "application/json")
  res.json({ avgLCP, avgFID, avgCLS })
})

module.exports = router
