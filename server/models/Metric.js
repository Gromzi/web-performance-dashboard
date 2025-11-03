const mongoose = require("mongoose");

const MetricSchema = new mongoose.Schema({
  page: String,
  lcp: Number,
  fid: Number,
  cls: Number,
  ttfb: Number,
  timestamp: Date,
});

module.exports = mongoose.model("Metric", MetricSchema);
