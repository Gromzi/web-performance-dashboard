const mongoose = require("mongoose")

const MetricSchema = new mongoose.Schema({
  page: String,
  lcp: Number,
  fid: Number,
  cls: Number,
  ttfb: Number,
  timestamp: Date,
})

MetricSchema.index({ lcp: 1, fid: 1, cls: 1, ttfb: 1 })
MetricSchema.index({ page: 1, timestamp: 1 })
MetricSchema.index({ timestamp: 1 })

module.exports = mongoose.model("Metric", MetricSchema)
