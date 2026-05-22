import RoleGuard from "@/components/portal/RoleGuard";
import type { ReactNode } from "react";

export default function CaregiverLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRole="caregiver">{children}</RoleGuard>;
}
