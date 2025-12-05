import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import { authenticateToken, type AuthRequest } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"
import ContactMessage from "../models/ContactMessage.js"
import { sendContactNotificationEmail } from "../utils/emailService.js"

const router = Router()

// Get all contact messages (admin only)
router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const messages = await ContactMessage.find().sort({ createdAt: -1 })
    res.json(messages)
  }),
)

// Submit contact form (public)
router.post(
  "/",
  [
    body("firstName").notEmpty().trim(),
    body("lastName").notEmpty().trim(),
    body("email").isEmail().normalizeEmail(),
    body("subject").notEmpty().trim(),
    body("message").notEmpty().trim().isLength({ min: 10 }),
    body("phone").optional().isMobilePhone("any"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const message = new ContactMessage(req.body)
    await message.save()

    await sendContactNotificationEmail(message)

    res.status(201).json({
      message: "Message received. Thank you for contacting us!",
      data: message,
    })
  }),
)

// Mark as read (admin only)
router.patch(
  "/:id/read",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true })
    if (!message) {
      return res.status(404).json({ message: "Message not found" })
    }
    res.json(message)
  }),
)

// Delete contact message (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const message = await ContactMessage.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ message: "Message not found" })
    }
    res.json({ message: "Message deleted" })
  }),
)

export default router
