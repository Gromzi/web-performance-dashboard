const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

// routes/metrics.js
router.get("/", async (req, res) => {
  const { page, date } = req.query
  const query = {}

  if (page) {
    query.page = page
  }

  if (date) {
    const start = new Date(date)
    const end = new Date(date)
    end.setDate(end.getDate() + 1)

    query.timestamp = { $gte: start, $lt: end }
  }

  const result = await Metric.find(query).sort({ timestamp: 1 }).lean()

  res.json(result)
})

module.exports = router
