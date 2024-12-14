
import express from 'express';
import { createOrder, verifyPayment,fetchSubscriptions, fetchPlans } from '../controller/paymentController.js';

const router = express.Router();

router.post('/create-subscription', createOrder);
router.post('/verify-payment', verifyPayment);
router.get('/fetch-subscriptions', fetchSubscriptions);
router.get('/fetch-plans', fetchPlans);


export default router;
