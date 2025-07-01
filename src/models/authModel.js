
import prisma from "../config/db"

export const createUser = async (data) => {
  const res = await prisma.user.create({
    data: {
      ...data,
      imgUrl: data.imgUrl
    }
  })

  return res
}

export const getUser = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email }
  })
  return user
}
