import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import { connectDB } from "./config/database.js"
import { config } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Routes
import authRoutes from "./routes/auth.js"
import pageRoutes from "./routes/pages.js"
import hotelRoutes from "./routes/hotels.js"
import tourRoutes from "./routes/tours.js"
import galleryRoutes from "./routes/gallery.js"
import contactRoutes from "./routes/contact.js"
import translationRoutes from "./routes/translations.js"

dotenv.config()

const app = express()

// Middleware
app.use(helmet())
app.use(cors({ origin: config.frontendUrl }))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/pages", pageRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/tours", tourRoutes)
app.use("/api/gallery", galleryRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/translations", translationRoutes)

// Error handling
app.use(errorHandler)

// Start server
const startServer = async () => {
  try {
    await connectDB()
    app.listen(config.port, () => {
      console.log(`[Server] Running on port ${config.port}`)
      console.log(`[Environment] ${config.nodeEnv}`)
    })
  } catch (error) {
    console.error("[Startup Error]", error)
    process.exit(1)
  }
}

startServer()
