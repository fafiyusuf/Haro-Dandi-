import { Router, type Response } from "express"
import { body, validationResult } from "express-validator"
import Page from "../models/Page.js"
import { type AuthRequest, authenticateToken } from "../middleware/auth.js"
import { asyncHandler } from "../middleware/errorHandler.js"

const router = Router()

// Get all published pages (public)
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pages = await Page.find({ isPublished: true })
    res.json(pages)
  }),
)

// Get page by slug (public)
router.get(
  "/:slug",
  asyncHandler(async (req, res) => {
    const page = await Page.findOne({ slug: req.params.slug, isPublished: true })
    if (!page) {
      return res.status(404).json({ message: "Page not found" })
    }
    res.json(page)
  }),
)

// Create page (admin only)
router.post(
  "/",
  authenticateToken,
  [body("slug").isSlug(), body("title").notEmpty(), body("contents").isArray()],
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const page = new Page(req.body)
    await page.save()
    res.status(201).json(page)
  }),
)

// Update page (admin only)
router.put(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!page) {
      return res.status(404).json({ message: "Page not found" })
    }
    res.json(page)
  }),
)

// Delete page (admin only)
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req: AuthRequest, res: Response) => {
    const page = await Page.findByIdAndDelete(req.params.id)
    if (!page) {
      return res.status(404).json({ message: "Page not found" })
    }
    res.json({ message: "Page deleted" })
  }),
)

export default router
