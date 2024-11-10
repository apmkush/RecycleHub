import { Router } from "express";
const router = Router();
import { addPickup } from "../controller/pickupController.js";
import cors from "cors";

router.use(cors());

router.post("/addPickup", addPickup);

export default router;