const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

// Deliberately inefficient: returns all documents, no pagination
router.get("/", async (req, res) => {
  const metrics = await Metric.find()
  res.json(metrics)
})

module.exports = router
