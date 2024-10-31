import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.createMany({
    data: [
      {
        username: "superuser1",
        fullName: "Super User 1",
        role: "SUPERUSER",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "pengawas1",
        fullName: "Pengawas 1",
        role: "PENGAWAS",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "madrasah1",
        fullName: "Madrasah 1",
        role: "MADRASAH",
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
