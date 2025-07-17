import bcrypt from "bcryptjs"

export const createHashedPassword = async password => {
  const salt = 10
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}


