import { categorizeScrapImage, getSuggestedPrice } from "../config/gemini.js";

/**
 * Categorize scrap from image upload
 * POST /categorize-scrap
 */
export const categorizeScrap = async (req, res) => {
  try {
    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Validate file is an image
    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "File must be an image",
      });
    }

    console.log("Processing image for categorization...");

    // Call Gemini Vision API
    const categorization = await categorizeScrapImage(req.file.buffer);

    if (!categorization.success) {
      return res.status(400).json({
        success: false,
        message: categorization.message,
        error: categorization.error,
      });
    }

    // Extract category and material from response
    const { category, material } = categorization.data;

    // Get suggested pricing info
    const priceInfo = await getSuggestedPrice(category, material);

    // Return complete categorization with pricing info
    return res.json({
      success: true,
      message: "Image categorized successfully",
      categorization: {
        category: categorization.data.category,
        material: categorization.data.material,
        confidence: categorization.data.confidence,
        description: categorization.data.description,
        condition: categorization.data.condition,
        estimatedWeight: categorization.data.estimatedWeight,
        recyclability: categorization.data.recyclability,
        notes: categorization.data.notes,
      },
      pricing: {
        category: priceInfo.category,
        material: priceInfo.material,
        message: priceInfo.message,
      },
    });
  } catch (error) {
    console.error("Categorization Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during categorization",
      error: error.message,
    });
  }
};

/**
 * Get pricing for a specific category
 * GET /get-category-price/:category
 */
export const getCategoryPrice = async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    const priceInfo = await getSuggestedPrice(category, null);

    return res.json({
      success: true,
      data: priceInfo,
    });
  } catch (error) {
    console.error("Get Category Price Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching category price",
      error: error.message,
    });
  }
};
