// src/lib/prisma.js 
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export default prisma;
