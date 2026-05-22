import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const EMAIL = "kahonbintezaman@gmail.com";
const PASSWORD = "ChangeMe123!";

async function main() {
  const existing = await prisma.user.findFirst({
    where: { email: EMAIL, deletedAt: null },
  });

  if (existing) {
    if (existing.role !== "admin") {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: "admin", isActive: true },
      });
      console.log(`Updated ${EMAIL} to admin role.`);
    } else {
      console.log(`Admin already exists: ${EMAIL}`);
    }
    return;
  }

  const passwordHash = await bcrypt.hash(PASSWORD, 12);
  await prisma.user.create({
    data: {
      role: "admin",
      firstName: "Kahon",
      lastName: "Zaman",
      email: EMAIL,
      emailVerifiedAt: new Date(),
      isActive: true,
      credential: { create: { passwordHash } },
    },
  });

  console.log(`Admin created: ${EMAIL} / ${PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
