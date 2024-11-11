import { Router } from "express";
const router = Router();
import { getPrice,editPrice, addItem } from "../controller/ratecontroller.js";
import cors from "cors";
router.use(cors());

router.get("/getPrice", getPrice);
router.put("/editPrice/:id", editPrice);
router.post("/addItem", addItem);


export default router;