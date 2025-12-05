export const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number.parseInt(process.env.PORT || "5000"),
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/haro-dandi",
  mongoDbName: process.env.MONGO_DB_NAME || "haro-dandi",
  jwtSecret: process.env.JWT_SECRET || "dev-secret-key-change-in-production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  // Single URL for backward compatibility
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  // Support multiple allowed origins via comma-separated list
  frontendUrls: (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number.parseInt(process.env.SMTP_PORT || "587"),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  adminEmail: process.env.ADMIN_EMAIL || "admin@harodandi.com",
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}
