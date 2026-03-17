import { Router } from "express";
const router = Router();
import authRoute from './authRoute.js';
import rateRoute from './rateRoute.js';
import pickupRoute from './pickupRoute.js';
import paymentRoute from './paymentRoute.js';
import billingRoute from './billingRoute.js';


router.use(authRoute);
router.use(rateRoute);
router.use(pickupRoute);
router.use(paymentRoute);
router.use(billingRoute);


export default router;