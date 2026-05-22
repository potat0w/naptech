import { apiRequest } from "./client";

export async function submitInquiry(data: {
  fullName: string;
  phone: string;
  email: string;
  message?: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}) {
  return apiRequest<{ inquiry: { id: string; subject: string; createdAt: string } }>(
    "/inquiries",
    { method: "POST", body: data }
  );
}
