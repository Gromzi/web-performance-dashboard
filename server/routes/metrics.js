const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

router.get("/", async (req, res) => {
  const metrics = await Metric.find()
  res.json(metrics)
})

module.exports = router
