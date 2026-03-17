import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addPickup, getPickups,acceptPickup, rejectPickup, deletePickup,getOrders } from "../controller/pickupController.js";
import upload from "../middlewares/uploadMiddleware.js";
import cors from "cors";

router.use(cors());

router.post("/addPickup",authMiddleware, upload.single('image'), addPickup);
router.get("/get-requests",authMiddleware, getPickups);
router.get("/get-orders",authMiddleware, getOrders);
router.put("/accept-request",authMiddleware, acceptPickup);
router.put("/reject-request",authMiddleware, rejectPickup);
router.delete("/delete-request/:id",authMiddleware, deletePickup);

export default router;