import { prisma } from "../db/prisma.js";
import { experienceFromApi, positionFromApi } from "../utils/mappers.js";
import { sendRecruitmentApplicationNotificationEmail } from "../utils/email.js";
import { emailConfigured } from "../config/env.js";

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
  const application = await prisma.recruitmentApplication.create({
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

  if (emailConfigured()) {
    void sendRecruitmentApplicationNotificationEmail({
      firstName: application.firstName,
      lastName: application.lastName,
      email: application.email,
      telephone: application.telephone,
      position: application.position,
      experience: application.experience,
      cvDriveUrl: application.cvDriveUrl,
      availability: application.availability ?? undefined,
      message: application.message ?? undefined,
    }).catch((err) =>
      console.error("Failed to send recruitment application notification email:", err)
    );
  }

  return application;
}
