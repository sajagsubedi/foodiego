// app/(admin)/layout.tsx

import DashboardSideBar from "@/components/dashboardComponents/DashboardSideBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <DashboardSideBar />
      <main className="lg:pl-56 sm:pl-11">{children}</main>
    </ProtectedRoute>
  );
}