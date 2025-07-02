import { Router } from "express";
import { otpVerify, userCreate } from "../controllers/authController.js";

const router = Router()
router.post("/create-user", userCreate)

router.post("/verify-otp", otpVerify)

export default router;
