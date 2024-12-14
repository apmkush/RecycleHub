
import express from 'express';
import { createOrder, verifyPayment,fetchSubscriptions } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-subscription', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/fetch-subscriptions', fetchSubscriptions);


export default router;
