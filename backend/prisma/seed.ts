import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

async function createUserWithCredential(data: {
  role: UserRole;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  address?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postcode: string;
  };
  caregiverProfile?: boolean;
}) {
  const passwordHash = await hashPassword(data.password);
  return prisma.user.create({
    data: {
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      emailVerifiedAt: new Date(),
      credential: { create: { passwordHash } },
      ...(data.address
        ? {
            address: {
              create: {
                addressLine1: data.address.addressLine1,
                addressLine2: data.address.addressLine2 ?? null,
                city: data.address.city,
                postcode: data.address.postcode,
              },
            },
          }
        : {}),
      ...(data.caregiverProfile
        ? {
            caregiverProfile: {
              create: {
                specializations: ["Dementia", "Mobility"],
                skills: ["Medication", "Personal care"],
              },
            },
          }
        : {}),
    },
  });
}

async function main() {
  const admin = await createUserWithCredential({
    role: "admin",
    firstName: "Naptec",
    lastName: "Admin",
    email: "admin@naptec.care",
    password: "ChangeMe123!",
  });

  const caregiverSeeds = [
    {
      firstName: "Sarah",
      lastName: "Mitchell",
      email: "caregiver@naptec.care",
      phone: "07700900101",
    },
    {
      firstName: "James",
      lastName: "Okonkwo",
      email: "james.okonkwo@naptec.care",
      phone: "07700900102",
    },
    {
      firstName: "Priya",
      lastName: "Sharma",
      email: "priya.sharma@naptec.care",
      phone: "07700900103",
    },
    {
      firstName: "Emma",
      lastName: "Walsh",
      email: "emma.walsh@naptec.care",
      phone: "07700900104",
    },
  ] as const;

  const caregivers = [];
  for (const c of caregiverSeeds) {
    const user = await createUserWithCredential({
      role: "caregiver",
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      password: "ChangeMe123!",
      caregiverProfile: true,
    });
    caregivers.push(user);
  }
  const caregiver = caregivers[0];

  const client = await createUserWithCredential({
    role: "client",
    firstName: "Helen",
    lastName: "Richardson",
    email: "client@naptec.care",
    phone: "07700900400",
    password: "ChangeMe123!",
    address: {
      addressLine1: "14 Oak Lane",
      city: "Manchester",
      postcode: "M20 3AB",
    },
  });

  const assignment = await prisma.assignment.create({
    data: {
      caregiverUserId: caregiver.id,
      assignedByUserId: admin.id,
      clientUserId: client.id,
      clientDisplayName: "Helen Richardson",
      serviceAddress: "14 Oak Lane, Manchester M20 3AB",
      shiftDate: new Date("2026-05-16"),
      shiftStart: "08:00",
      shiftEnd: "12:00",
      priority: "high",
      status: "in_progress",
      tasks: {
        create: [
          { sortOrder: 0, description: "Medication reminder" },
          { sortOrder: 1, description: "Personal care" },
        ],
      },
    },
  });

  await prisma.inquiry.create({
    data: {
      fullName: "Helen Richardson",
      phone: "07700900400",
      email: "helen.richardson@email.com",
      subject: "Evening care availability",
      message:
        "We are looking for evening domiciliary support for my mother in Stockport.",
      privacyConsent: true,
      marketingConsent: false,
    },
  });

  await prisma.activityLog.create({
    data: {
      actorUserId: caregiver.id,
      type: "assignment",
      entityType: "assignment",
      entityId: assignment.id,
      message: "Sarah Mitchell started assignment for Helen Richardson",
    },
  });

  console.log("Seed complete:");
  console.log("  admin@naptec.care / ChangeMe123!");
  console.log("  caregiver@naptec.care / ChangeMe123!");
  console.log("  james.okonkwo@naptec.care / ChangeMe123!");
  console.log("  priya.sharma@naptec.care / ChangeMe123!");
  console.log("  emma.walsh@naptec.care / ChangeMe123!");
  console.log("  client@naptec.care / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
