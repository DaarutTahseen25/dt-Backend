import { Router } from "express";
import { otpVerify, userCreate } from "../controllers/authController";

const router = Router()
router.post("/auth/create-user", userCreate)

router.post("/auth/verify-otp", otpVerify)
