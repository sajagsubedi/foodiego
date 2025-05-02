// app/(admin)/layout.tsx

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
