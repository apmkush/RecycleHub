import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { login, signup, verifyotp, sendotp, resetPassword, updateData, getData, changePassword,updateMode, googleLogin } from "../controller/authController.js";
import cors from "cors";

router.use(cors());

router.post(
  "/login",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  login
);


router.post("/signup", signup);
router.post("/verify-otp", verifyotp);
router.post("/send-otp", sendotp);
router.post("/reset-password", resetPassword);
router.get("/google-login", googleLogin);

router.put("/update-data",authMiddleware, updateData);
router.get("/get-data",authMiddleware, getData);
router.put("/change-password",authMiddleware, changePassword);
router.put("/update-mode",authMiddleware, updateMode);

export default router;