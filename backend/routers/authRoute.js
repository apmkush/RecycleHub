import { Router } from "express";
const router = Router();
import { body } from "express-validator";
import { login, signup, verifyotp, sendotp, resetPassword, updateData, getData, changePassword,updateMode } from "../controller/authController.js";
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


router.post("/singup", signup);
router.post("/verify-otp", verifyotp);
router.post("/send-otp", sendotp);
router.post("/reset-password", resetPassword);
router.put("/update-data", updateData);
router.get("/get-data", getData);
router.put("/change-password", changePassword);
router.put("/update-mode", updateMode);

export default router;