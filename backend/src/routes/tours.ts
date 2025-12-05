import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import Tour from "../models/Tour.js"
import { type AuthRequest, authenticateToken } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"

const router = Router()

// Get all published tours (public)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tours = await Tour.find({ isPublished: true })
    res.json(tours)
  }),
)

// Get tour by slug (public)
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const tour = await Tour.findOne({ slug: req.params.slug, isPublished: true })
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" })
    }
    res.json(tour)
  }),
)

// Create tour (admin only)
router.post(
  "/",
  authenticateToken,
  [body("slug").isSlug(), body("contents").isArray(), body("duration").isInt({ min: 1 })],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const tour = new Tour(req.body)
    await tour.save()
    res.status(201).json(tour)
  }),
)

// Update tour (admin only)
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" })
    }
    res.json(tour)
  }),
)

// Delete tour (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" })
    }
    res.json({ message: "Tour deleted" })
  }),
)

export default router
