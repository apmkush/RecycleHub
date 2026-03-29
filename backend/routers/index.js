import { Router } from "express";
const router = Router();
import authRoute from './authRoute.js';
import rateRoute from './rateRoute.js';
import pickupRoute from './pickupRoute.js';
import paymentRoute from './paymentRoute.js';
import billingRoute from './billingRoute.js';
import categorizationRoute from './categorizationRoute.js';


router.use(authRoute);
router.use(rateRoute);
router.use(pickupRoute);
router.use(paymentRoute);
router.use(billingRoute);
router.use(categorizationRoute);


export default router;