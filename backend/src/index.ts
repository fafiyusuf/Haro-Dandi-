import cors, { CorsOptions } from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import { connectDB } from "./config/database.js"
import { config } from "./config/env.js"
import { errorHandler } from "./middleware/errorHandler.js"

// Routes
import authRoutes from "./routes/auth.js"
import contactRoutes from "./routes/contact.js"
import galleryRoutes from "./routes/gallery.js"
import hotelRoutes from "./routes/hotels.js"
import pageRoutes from "./routes/pages.js"
import tourRoutes from "./routes/tours.js"
import translationRoutes from "./routes/translations.js"

dotenv.config()

const app = express()

// Middleware
app.use(helmet())

// CORS configuration: allow multiple origins and common patterns
const allowedOrigins = new Set<string>([...config.frontendUrls])

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests (no origin)
    if (!origin) return callback(null, true)
    try {
      const o = new URL(origin)
      if (
        allowedOrigins.has(origin) ||
        allowedOrigins.has(`${o.protocol}//${o.host}`) ||
        o.hostname === "localhost" ||
        o.hostname.endsWith(".vercel.app")
      ) {
        return callback(null, true)
      }
    } catch {
      // fall through to reject
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.options("*", cors(corsOptions))
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

// For Vercel deployment
if (process.env.VERCEL) {
  // Connect to database for serverless
  connectDB().catch(console.error)
} else {
  // Start server for local development
  startServer()
}

// Export for Vercel
export default app
