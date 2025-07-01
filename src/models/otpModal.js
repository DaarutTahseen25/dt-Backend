import prisma from "../config/db"
import { generateOtp } from "../utils/otp"

export const createOtp = async (email) => {
  const { otp, expiresAt } = generateOtp()
  const res = await prisma.otp.create({
    data: {
      email,
      code: otp,
      expiresAt
    }
  })
  return res
}

export const getOtp = async email => {
  return await prisma.otp.findFirst({
    where: { email: email },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
