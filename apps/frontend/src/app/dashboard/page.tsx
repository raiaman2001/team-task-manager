"use client";

import { AppShell } from "@/components/layout/app-shell";
import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { MemberDashboard } from "@/components/dashboard/member-dashboard";
import { useAuth } from "@/hooks/use-auth";

export default function DashboardPage() {
  const { data: user } = useAuth();
  
  return (
    <AppShell>
      {user?.role === "ADMIN" ? <AdminDashboard /> : <MemberDashboard />}
    </AppShell>
  );
}
