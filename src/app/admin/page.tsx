import type { Metadata } from "next";
import AdminGate from "@/app/admin/AdminGate";
import Dashboard from "@/app/admin/Dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <AdminGate>
      <Dashboard />
    </AdminGate>
  );
}
