import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createInvoice, getInvoices } from "../controller/billingController.js";

const router = Router();

router.post("/invoices", authMiddleware, createInvoice);
router.get("/invoices", authMiddleware, getInvoices);

export default router;
