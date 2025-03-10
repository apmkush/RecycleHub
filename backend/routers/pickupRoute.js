import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addPickup, getPickups,acceptPickup, deletePickup } from "../controller/pickupController.js";
import cors from "cors";

router.use(cors());

router.post("/addPickup",authMiddleware, addPickup);
router.get("/get-requests",authMiddleware, getPickups);
router.put("/accept-request",authMiddleware, acceptPickup);
router.delete("/delete-request/:id",authMiddleware, deletePickup);

export default router;