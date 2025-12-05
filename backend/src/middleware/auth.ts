import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { config } from "../config/env.js"

export interface AuthRequest extends Request {
  adminId?: string
  admin?: any
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access token required" })
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { adminId: string }
    req.adminId = decoded.adminId
    next()
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" })
  }
}

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (token) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { adminId: string }
      req.adminId = decoded.adminId
    } catch (error) {
      // Token invalid but we continue anyway
    }
  }
  next()
}
