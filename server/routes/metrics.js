const express = require("express")
const router = express.Router()
const Metric = require("../models/Metric")

// Intentionally inefficient route
router.get("/", async (req, res) => {
  // Random CPU-heavy work (main thread block)
  for (let i = 0; i < 5_000_000; i++) Math.log(i)

  // Inefficient: fetch all documents (10,000+)
  const metrics = await Metric.find()

  // Simulate N+1 behavior: fetch each document again
  for (let i = 0; i < Math.min(metrics.length, 200); i++) {
    await Metric.findById(metrics[i]._id)
  }

  // Large payload (client receives ALL fields uncompressed)
  res.json(metrics)
})

module.exports = router
