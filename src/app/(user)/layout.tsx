// app/(admin)/layout.tsx

import Footer from "@/components/public/Footer";
import Header from "@/components/public/Header";

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
