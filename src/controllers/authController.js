import { createUser, getUser } from '../models/authModel.js';
import { createHashedPassword } from '../utils/hashedPassword.js';
import { createOtp, verifyOtp } from '../models/otpModal.js';
import AppError from '../utils/AppError.js';
import { sendOtptoMail } from '../utils/resend.js';

// ✅ Student Registration
export const userCreate = async (req, res, next) => {
  try {
    const data = req.body;

    // Guard clause for required fields
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.NIN ||
      !data.phone ||
      !data.imgUrl
    ) {
      throw new AppError('All fields are required', 400);
    }

    // Create user with hashed password
    const user = await createUser({
      ...data,
      password: await createHashedPassword(data.password),
    });

    // Generate OTP
    const { otp } = await createOtp(user.email)

    //Send Otp to user
    await sendOtptoMail(user.email, otp)

    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

// ✅ OTP Verification
export const otpVerify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const otpRecord = await verifyOtp(email);

    if (!otpRecord) {
      throw new AppError('OTP not found', 404);
    }

    if (new Date(otpRecord.expiresAt) < new Date()) {
      throw new AppError('The OTP has expired', 410);
    }

    if (otpRecord.code !== code) {
      throw new AppError('Wrong OTP', 401);
    }

    const student = await getUser(email)

    if (!student) {
      throw new AppError("Student not found", 404)
    }
    const token = signToken({ userId: student.id });
    // Return to client
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
