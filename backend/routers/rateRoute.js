import { Router } from "express";
const router = Router();
import { getPrice,editPrice } from "../controller/ratecontroller.js";
import cors from "cors";

router.use(cors());

router.get("/getPrice", getPrice);
router.put("/editPrice/:id", editPrice);

export default router;