import { prisma } from "../db/prisma.js";
import { experienceFromApi, positionFromApi } from "../utils/mappers.js";

export async function createRecruitmentApplication(fields: {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  position: string;
  experience: string;
  cvDriveUrl: string;
  availability?: string;
  message?: string;
  rightToWork: unknown;
}) {
  return prisma.recruitmentApplication.create({
    data: {
      firstName: fields.firstName.trim(),
      lastName: fields.lastName.trim(),
      email: fields.email.trim().toLowerCase(),
      telephone: fields.telephone.trim(),
      position: positionFromApi(fields.position),
      experience: experienceFromApi(fields.experience),
      cvDriveUrl: fields.cvDriveUrl.trim(),
      availability: fields.availability || null,
      message: fields.message || null,
      rightToWorkConfirmed: true,
    },
  });
}
