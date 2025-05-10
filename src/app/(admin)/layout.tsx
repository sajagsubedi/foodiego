// app/(admin)/layout.tsx

import DashboardSideBar from "@/components/dashboard/DashboardSideBar";
import DashboardGuard from "@/components/wrappers/DashboardGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardGuard>
      <DashboardSideBar />
      <main className="lg:pl-56 sm:pl-14 bg-gray-50">{children}</main>
    </DashboardGuard>
  );
}
