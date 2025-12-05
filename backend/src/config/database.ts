import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/haro-dandi"
    await mongoose.connect(mongoUri)
    console.log("[Database] Connected to MongoDB successfully")
  } catch (error) {
    console.error("[Database] Connection error:", error)
    process.exit(1)
  }
}

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect()
    console.log("[Database] Disconnected from MongoDB")
  } catch (error) {
    console.error("[Database] Disconnection error:", error)
  }
}
