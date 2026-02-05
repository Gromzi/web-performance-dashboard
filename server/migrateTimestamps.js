const mongoose = require("mongoose")
require("dotenv").config()

const Metric = require("./models/Metric")

mongoose.connect(process.env.MONGO_URI)

async function migrate() {
  const metrics = await Metric.find({
    timestamp: { $type: "string" },
  })

  for (const m of metrics) {
    m.timestamp = new Date(m.timestamp)
    await m.save()
  }

  console.log(`Migrated ${metrics.length} documents`)
  process.exit(0)
}

migrate()
