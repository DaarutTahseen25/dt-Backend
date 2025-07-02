import { getUser } from "../models/authModel.js"
import bcrypt from "bcryptjs"

export const createHashedPassword = async password => {
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

export const verifyHashedPassword = async (password, email) => {
  const user = getUser(email)

  return await bcrypt.compare(password, user.password)
}
