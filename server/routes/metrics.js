const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

router.get("/", async (req, res) => {
  for (let i = 0; i < 5_000_000; i++) Math.log(i)

  const metrics = await Metric.find()

  for (let i = 0; i < Math.min(metrics.length, 200); i++) {
    await Metric.findById(metrics[i]._id)
  }

  res.json(metrics)
})

module.exports = router
