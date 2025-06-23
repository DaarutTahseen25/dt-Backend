import prisma from "../config/db";

// Placeholder: implement DB logic here later
export const fetchStudentsFromDB = async () => {

  const users = await prisma.user.findMany();

  return users
};
