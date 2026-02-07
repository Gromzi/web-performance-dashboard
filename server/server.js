const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use((req, res, next) => {
  const delay = Math.floor(Math.random() * 200)
  setTimeout(next, delay)
})

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "public, max-age=300")
  next()
})

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)

app.use("/api/metrics", require("./routes/metrics"))
app.use("/api/reports", require("./routes/reports"))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
