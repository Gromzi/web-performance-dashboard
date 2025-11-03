const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

// Connect to MongoDB (no error handling – intentionally suboptimal)
mongoose.connect(process.env.MONGO_URI)

app.use("/api/metrics", require("./routes/metrics"))
app.use("/api/reports", require("./routes/reports"))

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
