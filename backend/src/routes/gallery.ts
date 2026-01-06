import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import GalleryImage from "../models/Gallery.js"
import { type AuthRequest, authenticateToken } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"

const router = Router()

// Get all published gallery images (public)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { category } = req.query
    const query = { isPublished: true }
    if (category) {
      Object.assign(query, { category })
    }
    const images = await GalleryImage.find(query).sort({ order: 1 })
    res.json(images)
  }),
)

// Create gallery image (admin only)
router.post(
  "/",
  authenticateToken,
  [
    body("url")
      .custom((value) => {
        // Allow both HTTP/HTTPS URLs and data URLs
        if (value.startsWith("data:image/")) return true
        if (value.startsWith("http://") || value.startsWith("https://")) return true
        throw new Error("Invalid URL format")
      }),
    body("title").notEmpty(),
    body("category").isIn(["hotel", "tour", "experience", "other"]),
  ],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const image = new GalleryImage(req.body)
    await image.save()
    res.status(201).json(image)
  }),
)

// Update gallery image (admin only)
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!image) {
      return res.status(404).json({ message: "Gallery image not found" })
    }
    res.json(image)
  }),
)

// Delete gallery image (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const image = await GalleryImage.findByIdAndDelete(req.params.id)
    if (!image) {
      return res.status(404).json({ message: "Gallery image not found" })
    }
    res.json({ message: "Gallery image deleted" })
  }),
)

export default router
