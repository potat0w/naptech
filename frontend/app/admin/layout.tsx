import RoleGuard from "@/components/portal/RoleGuard";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <RoleGuard allowedRole="admin">{children}</RoleGuard>;
}
