const express = require("express");
const router = express.Router();
const Metric = require("../models/Metric");

// Inefficient: recomputes averages each time
router.get("/", async (req, res) => {
  const metrics = await Metric.find();
  const avgLCP =
    metrics.reduce((acc, m) => acc + (m.lcp || 0), 0) / metrics.length || 0;
  const avgFID =
    metrics.reduce((acc, m) => acc + (m.fid || 0), 0) / metrics.length || 0;
  const avgCLS =
    metrics.reduce((acc, m) => acc + (m.cls || 0), 0) / metrics.length || 0;

  res.json({ avgLCP, avgFID, avgCLS });
});

module.exports = router;
