import { Router } from "express";
import { categorizeScrap, getCategoryPrice } from "../controller/categorizationController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import cors from "cors";

const router = Router();

router.use(cors());

/**
 * POST /categorize-scrap
 * Categorize scrap item from image using Gemini Vision API
 * Requires: image file in multipart form
 * Returns: category, material, confidence, condition, estimated weight, etc.
 */
router.post(
  "/categorize-scrap",
  authMiddleware,
  upload.single("image"),
  categorizeScrap
);

/**
 * GET /get-category-price/:category
 * Get pricing reference for a specific category
 * Returns: category mapping and pricing reference
 */
router.get("/get-category-price/:category", authMiddleware, getCategoryPrice);

export default router;
