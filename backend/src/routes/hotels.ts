import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import Hotel from "../models/Hotel.js"
import { type AuthRequest, authenticateToken } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"

const router = Router()

// Get all published hotels (public)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const hotels = await Hotel.find({ isPublished: true })
    res.json(hotels)
  }),
)

// Get hotel by slug (public)
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const hotel = await Hotel.findOne({ slug: req.params.slug, isPublished: true })
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" })
    }
    res.json(hotel)
  }),
)

// Create hotel (admin only)
router.post(
  "/",
  authenticateToken,
  [body("slug").isSlug(), body("contents").isArray(), body("location").notEmpty()],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const hotel = new Hotel(req.body)
    await hotel.save()
    res.status(201).json(hotel)
  }),
)

// Update hotel (admin only)
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" })
    }
    res.json(hotel)
  }),
)

// Delete hotel (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id)
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" })
    }
    res.json({ message: "Hotel deleted" })
  }),
)

export default router
