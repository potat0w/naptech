import { apiRequest } from "./client";

export async function submitRecruitmentApplication(data: {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  position: string;
  experience: string;
  cvDriveUrl: string;
  availability?: string;
  message?: string;
  rightToWork: boolean;
}) {
  return apiRequest<{ application: { id: string; status: string; createdAt: string } }>(
    "/recruitment/applications",
    { method: "POST", body: data }
  );
}
