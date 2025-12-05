import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import Translation from "../models/Translation.js"
import { type AuthRequest, authenticateToken } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"

const router = Router()

// Get all translations for a language (public)
router.get(
  "/:language",
  asyncHandler(async (req, res) => {
    const { language } = req.params
    if (!["en", "am", "om"].includes(language)) {
      return res.status(400).json({ message: "Invalid language" })
    }

    const translations = await Translation.find({ language })
    const result = translations.reduce(
      (acc, t) => {
        acc[t.key] = t.value
        return acc
      },
      {} as Record<string, string>,
    )

    res.json(result)
  }),
)

// Create/update translation (admin only)
router.post(
  "/",
  authenticateToken,
  [
    body("key").notEmpty().isSlug(),
    body("language").isIn(["en", "am", "om"]),
    body("value").notEmpty(),
    body("category").optional().notEmpty(),
  ],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { key, language, value, category } = req.body

    const translation = await Translation.findOneAndUpdate(
      { key, language },
      { value, category },
      { upsert: true, new: true },
    )

    res.json(translation)
  }),
)

// Update translation (admin only)
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const translation = await Translation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!translation) {
      return res.status(404).json({ message: "Translation not found" })
    }
    res.json(translation)
  }),
)

// Delete translation (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const translation = await Translation.findByIdAndDelete(req.params.id)
    if (!translation) {
      return res.status(404).json({ message: "Translation not found" })
    }
    res.json({ message: "Translation deleted" })
  }),
)

export default router
