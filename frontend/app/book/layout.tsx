import RoleGuard from "@/components/portal/RoleGuard";
import type { ReactNode } from "react";

export default function BookLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRole="client">{children}</RoleGuard>;
}
