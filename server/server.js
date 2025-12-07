const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// No compression() middleware — responses stay uncompressed

// Artificial network latency (0–600ms)
app.use((req, res, next) => {
  const delay = Math.floor(Math.random() * 200)
  setTimeout(next, delay)
})

// Disable caching entirely (forces re-fetch on every request)
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store")
  next()
})

// Global slow JSON middleware (simulate heavy parsing)
app.use((req, res, next) => {
  // BLOCKING work — main thread freeze
  for (let i = 0; i < 2e5; i++) Math.sqrt(i)
  express.json()(req, res, next)
})

// CORS without specific origins (acceptable mistake)
app.use(cors())

// No error handling — DB failures silently break
mongoose.connect(process.env.MONGO_URI)

app.use("/api/metrics", require("./routes/metrics"))
app.use("/api/reports", require("./routes/reports"))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
