
import express from 'express';
import { createOrder, verifyPayment,fetchSubscriptions, fetchPlans, createPayoutRequest } from '../controller/paymentController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create-subscription', authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment);
router.get('/fetch-subscriptions', authMiddleware, fetchSubscriptions);
router.post('/payout', authMiddleware, createPayoutRequest);
router.get('/fetch-plans', fetchPlans);


export default router;
