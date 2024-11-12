import { Router } from "express";
const router = Router();
import { getPrice,editPrice, addItem, deleteItem} from "../controller/ratecontroller.js";
import cors from "cors";
router.use(cors());

router.get("/getPrice", getPrice);
router.put("/editPrice/:id", editPrice);
router.put("/deleteItem/:id", deleteItem);
router.post("/addItem", addItem);


export default router;