import { Router } from "express";
const router = Router();
import { getPrice,editPrice, addItem, deleteItem} from "../controller/ratecontroller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import cors from "cors";
router.use(cors());

// Public endpoint - anyone can view prices
router.get("/getPrice", getPrice);

// Protected endpoints - admin only
router.put("/editPrice/:id", authMiddleware, editPrice);
router.delete("/deleteItem/:id", authMiddleware, deleteItem);
router.post("/addItem", authMiddleware, addItem);


export default router;