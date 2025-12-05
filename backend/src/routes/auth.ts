import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import jwt, { type Secret, type SignOptions } from "jsonwebtoken"
import { config } from "../config/env.js"
import { authenticateToken, type AuthRequest } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"
import Admin from "../models/Admin.js"

const router = Router()

// Login
router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 8 })],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const isPasswordValid = await admin.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

  const jwtSecret: Secret = config.jwtSecret as Secret
  const signOptions: SignOptions = { expiresIn: config.jwtExpiresIn as any }
  const token = jwt.sign({ adminId: admin._id.toString() }, jwtSecret, signOptions)

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  }),
)

// Get current admin
router.get(
  "/me",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const admin = await Admin.findById(req.adminId).select("-password")
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }
    res.json(admin)
  }),
)

// Logout (client-side token deletion, but we can invalidate on backend if needed)
router.post("/logout", authenticateToken, (req: AuthRequest, res: Response) => {
  res.json({ message: "Logged out successfully" })
})

export default router
