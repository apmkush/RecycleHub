
import express from 'express';
import { createOrder, verifyPayment, payout } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);
router.post('/payout', payout);

export default router;
