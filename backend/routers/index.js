import { Router } from "express";
const router = Router();
import authRoute from './authRoute.js';
import rateRoute from './rateRoute.js';


router.use(authRoute);
router.use(rateRoute);


export default router;