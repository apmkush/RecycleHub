import { Router } from "express";
const router = Router();
import { addPickup, getPickups,acceptPickup, deletePickup } from "../controller/pickupController.js";
import cors from "cors";

router.use(cors());

router.post("/addPickup", addPickup);
router.get("/get-requests", getPickups);
router.put("/accept-request", acceptPickup);
router.delete("/delete-request/:id", deletePickup);

export default router;