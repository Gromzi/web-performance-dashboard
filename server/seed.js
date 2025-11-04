const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Metric = require("./models/Metric")

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

async function seedData() {
  console.log("Seeding data...")
  const pages = ["Home", "About", "Dashboard", "Contact", "Settings", "Profile"]
  const data = []

  for (let i = 0; i < 10000; i++) {
    const page = pages[Math.floor(Math.random() * pages.length)]
    data.push({
      page,
      lcp: Math.floor(Math.random() * 5000) + 1000,
      fid: Math.floor(Math.random() * 500) + 50,
      cls: parseFloat((Math.random() * 0.4).toFixed(2)),
      ttfb: Math.floor(Math.random() * 1500) + 300,
      timestamp: new Date(Date.now() - Math.random() * 100000000),
    })
  }

  await Metric.deleteMany({})
  await Metric.insertMany(data)
  console.log("✅ Database seeded with 10,000 metrics!")
  process.exit()
}

seedData()
