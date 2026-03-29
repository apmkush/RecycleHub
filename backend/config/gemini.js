import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ GEMINI_API_KEY is not configured in environment variables");
}

const client = new GoogleGenerativeAI(apiKey);

/**
 * Categorize scrap image using Gemini Vision API
 * @param {Buffer} imageBuffer - Image file buffer
 * @returns {Promise<Object>} Categorization result with category, material, and suggested price
 */
export const categorizeScrapImage = async (imageBuffer) => {
  try {
    if (!apiKey) {
      return {
        success: false,
        message: "Gemini API key not configured",
        error: "GEMINI_API_KEY missing",
      };
    }

    if (!imageBuffer) {
      return {
        success: false,
        message: "No image provided",
        error: "Empty image buffer",
      };
    }

    // Convert buffer to base64
    const base64Image = imageBuffer.toString("base64");

    // Initialize the model
    const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Create the prompt for scrap categorization
    const prompt = `You are an expert in scrap and recycling categorization. Analyze this image and provide the following information in JSON format:

{
  "category": "One of: Electronics, Brass, Copper, Iron, Aluminum, Plastic, Paper, Glass, Mixed",
  "material": "Specific material name (e.g., Laptop, Mobile, Copper Wire, Brass Fittings, etc.)",
  "confidence": "High, Medium, or Low",
  "description": "Brief description of what you see",
  "condition": "Good, Fair, or Poor",
  "estimatedWeight": "rough estimate in kg (e.g., '2-3 kg')",
  "recyclability": "Highly Recyclable, Moderately Recyclable, or Low Recyclability",
  "notes": "Any special notes or warnings"
}

Please return ONLY valid JSON, no additional text.`;

    // Call Gemini API with image
    const response = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg", // Assume JPEG, can be improved with file type detection
        },
      },
      prompt,
    ]);

    // Extract text response
    const result = response.response.text();
    
    // Parse JSON from response
    let parsedResult;
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        parsedResult = JSON.parse(result);
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      return {
        success: false,
        message: "Failed to parse categorization response",
        error: parseError.message,
      };
    }

    return {
      success: true,
      data: parsedResult,
      message: "Image categorized successfully",
    };
  } catch (error) {
    console.error("Gemini Vision API Error:", error);
    return {
      success: false,
      message: "Failed to categorize image",
      error: error.message,
    };
  }
};

/**
 * Get suggested price based on category and material
 * @param {String} category - Scrap category
 * @param {String} material - Specific material
 * @returns {Object} Category and default pricing info
 */
export const getSuggestedPrice = async (category, material) => {
  try {
    // This maps Gemini categories to your Rate model categories and fetches pricing
    // For now, return category mapping
    const categoryMapping = {
      "Electronics": "Electronics",
      "Brass": "Brass",
      "Copper": "Copper",
      "Iron": "Iron",
      "Aluminum": "Aluminum",
      "Plastic": "Plastic",
      "Paper": "Paper",
      "Glass": "Glass",
      "Mixed": "Mixed",
    };

    return {
      success: true,
      category: categoryMapping[category] || category,
      material: material,
      message: "Use this category to fetch pricing from Rate table",
    };
  } catch (error) {
    console.error("Error getting suggested price:", error);
    return {
      success: false,
      message: "Failed to get pricing suggestion",
      error: error.message,
    };
  }
};
