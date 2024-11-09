import { Router } from "express";
const router = Router();
import authRoute from './authRoute.js';


router.use(authRoute);


export default router;