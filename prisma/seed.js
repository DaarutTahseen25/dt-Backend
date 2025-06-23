import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Zayd', email: 'zayd@example.com' },
      { name: 'Amina', email: 'amina@example.com' },
      { name: 'Khalid', email: 'khalid@example.com' },
      { name: 'Fatima', email: 'fatima@example.com' },
      { name: 'Ibrahim', email: 'ibrahim@example.com' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log('✅ Seed complete'))
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

