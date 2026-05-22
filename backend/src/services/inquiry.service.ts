import { prisma } from "../db/prisma.js";
import { logActivity } from "../utils/activity.js";
import { deriveInquirySubject } from "../utils/mappers.js";
import { sendInquiryNotificationEmail } from "../utils/email.js";
import { smtpConfigured } from "../config/env.js";
import type { EnquiryType, InquiryStatus } from "@prisma/client";

export async function createInquiry(data: {
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
  enquiryType?: string;
  careHomeSlug?: string;
}) {
  const message = data.message?.trim() ?? "";
  const inquiry = await prisma.inquiry.create({
    data: {
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim().toLowerCase(),
      subject: deriveInquirySubject(message),
      message: message || null,
      privacyConsent: Boolean(data.privacyConsent),
      marketingConsent: Boolean(data.marketingConsent),
      enquiryType: data.enquiryType as EnquiryType | undefined,
      careHomeSlug: data.careHomeSlug ?? null,
    },
  });

  void logActivity({
    type: "inquiry",
    entityType: "inquiry",
    entityId: inquiry.id,
    message: `New enquiry from ${inquiry.fullName}`,
  }).catch((err) => console.error("Failed to log enquiry activity:", err));

  if (smtpConfigured()) {
    void sendInquiryNotificationEmail({
      fullName: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      subject: inquiry.subject,
      message: inquiry.message ?? "",
    }).catch((err) => console.error("Failed to send enquiry notification email:", err));
  }

  return inquiry;
}

export async function listInquiries(status?: InquiryStatus) {
  return prisma.inquiry.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  return prisma.inquiry.update({ where: { id }, data: { status } });
}
