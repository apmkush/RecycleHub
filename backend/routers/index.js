import { Router } from "express";
const router = Router();
import authRoute from './authRoute.js';
import rateRoute from './rateRoute.js';
import pickupRoute from './pickupRoute.js';


router.use(authRoute);
router.use(rateRoute);
router.use(pickupRoute);


export default router;